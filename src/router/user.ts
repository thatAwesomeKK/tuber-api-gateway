import { Router } from "express";
const router = Router();
import fetchUserController from "../controllers/user/fetchUserController";
import fetchVideosByUidController from "../controllers/user/fetchVideosByUidController";
import { authMiddleware } from "@thatawesomekk/single-sign-on";

router.get("/fetch", authMiddleware, fetchUserController);
router.get("/videos", authMiddleware, fetchVideosByUidController);

export default router;
