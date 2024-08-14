import { authMiddleware } from "@thatawesomekk/single-sign-on";
import { Router } from "express";
import createCommentController from "../controllers/comment/createCommentController";
import fetchCommentsByVideoController from "../controllers/comment/fetchCommentsByVideoController";
import deleteCommentController from "../controllers/comment/deleteCommentController";
import editCommentController from "../controllers/comment/editCommentController";
const router = Router();

router.post("/create", authMiddleware, createCommentController);
router.get("/fetch-by-video/:id", fetchCommentsByVideoController);
router.delete("/delete/:videoid", authMiddleware, deleteCommentController);
router.put("/edit", authMiddleware, editCommentController);

export default router;
