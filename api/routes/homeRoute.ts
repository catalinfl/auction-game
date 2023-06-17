import { Request, Response, Router } from "express";
import { verifyToken } from "../utils/verifyToken";

const router = Router();

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    try {
        res.status(200).json({"message: ": "Welcome to the home page" })
    }
    catch(err) {
        res.status(401).json(err);
    }
})



export default router;