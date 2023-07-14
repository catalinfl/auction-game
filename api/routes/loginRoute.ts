import { Router, Request, Response } from "express";
import bcrypt from "bcrypt"
import User from "../models/UserSchema";
const router = Router();
import jwt from "jsonwebtoken";
import Crate from "../models/CrateSchema";

router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({"Error: ": "Please fill in all fields"})
    }
    else {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(400).json({"Error: ": "User doesn't exist"})
            }
            else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(400).json({ "Error: ": "incorrect password"});
                }
                const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET as string, {
                    expiresIn: "1d"
                });
                res.cookie("isLoggedIn", "logged", {
                    httpOnly: false,
                    sameSite: 'strict',
                    expires: new Date(Date.now() + 86400000) })
                res.cookie("authorization", token, {
                    httpOnly: true,
                    sameSite: 'strict', 
                    expires: new Date(Date.now() + 86400000) });
                user.lastTimeConnected = new Date(Date.now());
                if (user.lastChestReceived.getDate() !== new Date(Date.now()).getDate()) {
                       const crate = await Crate.create({
                        type: "Crate",
                        rarity: "common",
                        cost: 0,
                        tier: "1",
                        owner: user._id
                    })
                    await crate.save();
                    user.crates.push(crate);
                    user.lastChestReceived = new Date(Date.now());
                }
                user.save();
                return res.status(200).json(user);
            }                
        }
        catch(err) {
            res.status(404).json({ "Error: ": "Something went wrong" })
        }
    }
})

export default router;