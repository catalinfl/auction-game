import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authorization;
    if (!token) return res.status(401).json({ "message": "Access denied" });
    try {
        const verified = jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        if (!verified) return res.status(401).json({ "message": "Access denied" });
        else {
            next();
        }
    }
    catch (err) {
        res.status(400).json({ "message": "Invalid token" })    
    }
}

