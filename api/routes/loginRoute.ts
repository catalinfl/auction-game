import mongoose from "mongoose";
import express, { Router, Request, Response } from "express";
import bcrypt from "bcrypt"
import User from "../models/UserSchema";
const router = Router();
import jwt from "jsonwebtoken";

router.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({"Error: ": "Please fill in all fields"})
    }
    else {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                res.status(400).json({"Error: ": "User doesn't exist"})
            }
            else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    res.status(404).json({ "Error": "incorrect password"});
                }
                const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET as string, {
                    expiresIn: "1d"
                });
                res.cookie("authorization", token, { httpOnly: true, sameSite: "none", expires: new Date(Date.now() + 86400000) });
                res.status(200).json({ "Success": "Logged in" });
            }                
        }
        catch(err) {
            res.status(404).json(err);
        }
    }
})

export default router;