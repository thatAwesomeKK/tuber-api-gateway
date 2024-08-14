import { Request, Response } from "express";
import { handleDislike } from "../../helper/apiCalls/video";

export default async function (req: Request, res: Response) {
  try {
    const user = req.user;
    const { videoId } = req.body;
    if (!videoId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    // Call to metadata server
    const payload = await handleDislike(videoId, user.uid);

    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}
