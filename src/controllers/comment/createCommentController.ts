import { Request, Response } from "express";
import { createComment } from "../../helper/apiCalls/comment";

export default async function (req: Request, res: Response) {
  try {
    const user = req.user;
    const { videoId, comment } = req.body;

    if (!videoId || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    const payload = await createComment({
      videoId,
      comment,
      userId: user.uid,
      expiresAt: user.expiresAt ?? undefined,
    });

    return res.status(payload.status).json(payload.data);
  } catch (error: any) {
    console.log(error.response.data);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
