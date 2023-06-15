import { Request, Response, Router } from "express";
import { verifyToken } from "../utils/verifyToken";

const router = Router();

router.get('/', verifyToken, (req: Request, res: Response) => {
    return res.status(200).json({ "message": "works" })
})

export default router;