import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authorization;
    if (!token) return res.status(401).json({ message: "Access denied" });
    try {
        const verified = jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        console.log(verified);
        req.body.username = verified;
        res.status(200).json({ verified })
    }
    catch (err) {
        res.status(400).json({ message: "Invalid token" })    
    }
}