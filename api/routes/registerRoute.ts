import express, { Router } from "express";
import { Request, Response } from "express";
const router = Router();
import bcrypt from "bcrypt";
import User from "../models/UserSchema";

router.post('/', async (req: Request, res: Response) => {
        const { username, password, email } = req.body;
        if (req.body.username == undefined || req.body.password == undefined || req.body.email == undefined) return res.status(400).json({ message: "Please fill in all fields" }
        )
        else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            try {
                const userFromDb = await User.findOne({ username })
                const emailFromDb = await User.findOne({ email });
                if (userFromDb || emailFromDb) {
                    res.status(400).json({ message: "User already exists" });
                }
                else {
                    await User.create({
                        username,
                        password: encryptedPassword,
                        email
                    })
                    res.status(200).json({ message: "User created" });
                }
            }
            catch (error){
                res.status(404).json({ message: "Something went wrong" })
            }
        }
})


export default router;