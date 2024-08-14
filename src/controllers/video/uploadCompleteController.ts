import { Request, Response } from "express";
import { uploadComplete } from "../../helper/apiCalls/video";

export default async function uploadCompleteController(
  req: Request,
  res: Response
) {
  try {
    const { originalname, uploadId } = req.body;

    const user = req.user;

    const payload: any = await uploadComplete(originalname, user, uploadId);

    return res.status(200).json({
      success: true,
      message: "Video uploading!",
      videoId: payload.videoId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
