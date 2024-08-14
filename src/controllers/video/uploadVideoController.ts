import { Request, Response } from "express";
import streamifier from "streamifier";
import { uploadVideo } from "../../helper/apiCalls/video";

export default async function uploadVideoController(
  req: Request,
  res: Response
) {
  try {
    if (req.file) {
      const fileStream = streamifier.createReadStream(req.file.buffer);

      await uploadVideo(req.file.originalname, fileStream);
    } else {
      throw new Error("No file uploaded");
    }
    res.end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
