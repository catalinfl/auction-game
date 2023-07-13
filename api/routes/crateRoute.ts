import express, { Request, Response, Router }  from "express"
import Crate from "../models/CrateSchema";
import User from "../models/UserSchema";
import { verifyToken } from "../utils/verifyToken";
const router = Router();

// buy crate

router.post('/buy', verifyToken, async (req: Request, res: Response) => {
    try {
        const user = await User.findById({ _id: req.body.owner });
        var createCrate;
        if (user !== null && user !== undefined) {
            if (user.money < req.body.cost) return res.status(400).json({"Error": "Not enough money"});
            else {
                createCrate = await Crate.create({
                    bought: Date.now(),
                    rarity: req.body.rarity,
                    cost: req.body.cost,
                    tier: req.body.tier,
                    owner: req.body.owner
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
 
// get crates on rarity

router.get('/rarity/:rarity', verifyToken, async (req: Request, res: Response) => {
    try {
        const crates = await Crate.find({ rarity: req.params.rarity });
        res.status(200).json(crates);
    }
    catch(err) {
        res.status(404).json(err);
    }
})

// cost query 

router.get('/cost', verifyToken, async (req: Request, res: Response) => {
    try {
        const crates = await Crate.find({ cost: { $gte: req.query.min, $lte: req.query.max } });
        res.status(200).json(crates);
    }
    catch(err) {
        res.status(404).json(err);
    }
})

export default router;