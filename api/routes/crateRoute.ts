import express, { Request, Response, Router }  from "express"
import Crate from "../models/CrateSchema";
import User from "../models/UserSchema";
import { verifyToken } from "../utils/verifyToken";
const router = Router();

// buy crate

router.post('/buy', verifyToken, async (req: Request, res: Response) => {
    try {
        const createCrate = await Crate.create({
            bought: Date.now(),
            rarity: req.body.rarity,
            cost: req.body.cost,
            tier: req.body.tier,
            owner: req.body.owner
        })
        createCrate.save();
        const user = await User.findById({ _id: req.body.owner });
        user?.crates.push(createCrate._id);
        user?.save();
        res.status(200).json(createCrate);
    }
    catch(err) {
        res.status(404).json(err);
    }})


// get all user crates
router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const crates = await Crate.find({ owner: req.body.owner });
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