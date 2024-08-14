import { Request, Response } from "express";
import { editComment } from "../../helper/apiCalls/comment";

export default async function (req: Request, res: Response) {
  try {
    const user = req.user;
    const { videoId, comment } = req.body;

    if (!videoId || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const payload = await editComment({
      videoId,
      comment,
      userId: user.uid,
    });

    return res.status(payload.status).json(payload.data);
  } catch (error: any) {
    console.log(error.response.data);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
