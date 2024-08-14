import { Router } from "express";
import { upload } from "../config/multer";
import uploadCompleteController from "../controllers/video/uploadCompleteController";
import streamVideoController from "../controllers/video/streamVideoController";
import uploadVideoController from "../controllers/video/uploadVideoController";
import updateMetadataController from "../controllers/video/updateMetadataController";
import fetchAllVideosController from "../controllers/video/fetchAllVideosController";
import fetchVideoMetadataController from "../controllers/video/fetchVideoMetadataController";
import { authMiddleware } from "@thatawesomekk/single-sign-on";
import deleteVideoController from "../controllers/video/deleteVideoController";
import fetchVideoByTagController from "../controllers/video/fetchVideoByTagController";
import handleViewCountController from "../controllers/video/handleViewCountController";
import checkGuest from "../middleware/checkGuest";
import handleLikeController from "../controllers/video/handleLikeController";
import handleDislikeController from "../controllers/video/handleDislikeController";
const router = Router();

router.post(
  "/upload",
  authMiddleware,
  checkGuest,
  upload.single("video"),
  uploadVideoController
);
router.post(
  "/upload-complete",
  authMiddleware,
  checkGuest,
  uploadCompleteController
);

router.get("/fetch", fetchAllVideosController);
router.get("/stream", streamVideoController);

router.get("/fetch-metadata/:id", fetchVideoMetadataController);
router.get("/fetch-by-tag/:id", fetchVideoByTagController);

router.put("/handle-view-count/:id", handleViewCountController);
router.put("/handle-like", authMiddleware, handleLikeController);
router.put("/handle-dislike", authMiddleware, handleDislikeController);

router.put(
  "/update-metadata/:id",
  authMiddleware,
  checkGuest,
  updateMetadataController
);
router.delete("/delete/:id", authMiddleware, checkGuest, deleteVideoController);

export default router;
