import { Request, Response, Router } from "express";
import { verifyToken } from "../utils/verifyToken";

const router = Router();

router.get('/', verifyToken, (req: Request, res: Response) => {
    res.json({ "message": "works" })
})

export default router;