import { authMiddleware } from "@thatawesomekk/single-sign-on";
import { Router } from "express";
import createPlaylistController from "../controllers/playlist/createPlaylistController";
import fetchPlaylistByIdController from "../controllers/playlist/fetchPlaylistByIdController";
import updatePlaylistController from "../controllers/playlist/updatePlaylistController";
import deletePlaylistController from "../controllers/playlist/deletePlaylistController";
import handleVidsController from "../controllers/playlist/handleVidsController";
import fetchPlaylistByUserIdController from "../controllers/playlist/fetchPlaylistByUserIdController";
const router = Router();

router.post("/create", authMiddleware, createPlaylistController);
router.get("/fetch-by-id/:id", fetchPlaylistByIdController);
router.patch("/update/:id", updatePlaylistController);
router.delete("/delete/:id", authMiddleware, deletePlaylistController);

router.get("/fetch-by-user", authMiddleware, fetchPlaylistByUserIdController);

router.patch("/handle-vids/:id", authMiddleware, handleVidsController);

export default router;
