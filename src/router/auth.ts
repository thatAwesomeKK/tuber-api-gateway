import loginUserController from "../controllers/auth/loginUserController";
import logoutUserController from "../controllers/auth/logoutUserController";
import { Router } from "express";
const router = Router();

router.get("/signin", loginUserController);
router.get("/signout", logoutUserController);

export default router;
