import express, { NextFunction, Request, Response, Router }  from "express"
import Crate, { CrateInterface } from "../models/CrateSchema";
import User from "../models/UserSchema";
import { verifyToken } from "../utils/verifyToken";
import { ObjectsType, objects, selectObject } from "../utils/objects";

const router = Router();

type QueryType = {
    owner: string,
    cost?: { $gte: number, $lte: number }
    rarity?: string
}

router.post('/buy', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.body.owner);
        var createCrate;
        if (user !== null && user !== undefined) {
            if (user.money < req.body.cost) return res.status(400).json({"Error": "Not enough money"});
            else {
                createCrate = await Crate.create({
                    bought: Date.now(),
                    rarity: req.body.rarity,
                    cost: req.body.cost,
                    type: req.body.type,
                    tier: req.body.tier,
                    owner: req.body.owner,
                    objects: req.body.rarity === "common" ? 5 :
                             req.body.rarity === "uncommon" ? 7 :
                             req.body.rarity === "rare" ? 9 :
                             req.body.rarity === "epic" ? 11 :
                             req.body.rarity === "legendary" ? 13 : 5                             
                })
                createCrate.save();
                user.crates.push(createCrate._id);
                user.money -= req.body.cost;
                user.save();
            }
        }
        else {
            res.status(404).json({"Error": "User not found"})
        }
        res.status(200).json(createCrate);
    }
    catch(err) {
        res.status(404).json(err);
    }})

    
// get all user crates
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const crates = await Crate.find({ owner: req.params.id });
        res.status(200).json(crates);
    }
    catch(err) {
        res.status(404).json(err);
    }
}) 

// open crate
router.get('/open/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (id !== null || id !== undefined) {
        try {
            const crate = await Crate.findById(id);
            const user = await User.findById(crate?.owner.toString());
            if (crate !== null && crate !== undefined && user !== null && user !== undefined) {
                     crate.objects = crate.objects - 1;
                     const obj = selectObject();
                     user.objects.push(obj);

                     if (crate.objects === 0) {
                        user.cratesOpened += 1;
                        user.crates = user?.crates.filter((crateId: CrateInterface) => crateId.toString() !== id);
                        await Crate.findByIdAndDelete(id);
                        res.status(200).json({"Success": "Crate was opened"});
                    }

                    await user.save();
                    await crate.save();
                    res.status(200).json({obj})                     
             }
            }
        catch(err) {
                res.status(404).json(err);
        }
    }
})

// sell crate
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const crate = await Crate.findById(id);
        const user = await User.findById(crate?.owner);
        if (crate !== null && crate !== undefined) {
            if (user !== null && user !== undefined) {
                user.money += crate.cost / 2;
                user.crates = user.crates.filter((crateId) => crateId.toString() !== id);
                await user.save();
                await Crate.findByIdAndDelete(id);
                res.status(200).json({"Success": "Crate was sold"});
            }
            else {
                res.status(404).json({"Error": "User not found"})
            }
        }
    }
    catch(err) {
        res.status(404).json(err);
    }
})



router.get('/:id/query', verifyToken, async (req: Request, res: Response) => {
    try {
        const query: QueryType = { owner: req.params.id }
        if (req.query.rarity && req.query.rarity !== "All") {
                query.rarity = req.query.rarity as string;
                query.rarity = query.rarity.toLowerCase();
            }
        if (req.query.min && req.query.max) {
            query.cost = { $gte: parseInt(req.query.min as string), $lte: parseInt(req.query.max as string) }
        }
        const crates = await Crate.find(query);
        res.status(200).json(crates);
    }
    catch(err) {
        res.status(400).json(err);
    }
})




export default router;