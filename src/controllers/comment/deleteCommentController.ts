import { Request, Response } from "express";
import { deleteComment } from "../../helper/apiCalls/comment";

export default async function (req: Request, res: Response) {
  try {
    const { videoid } = req.params;
    const user = req.user;

    if (!videoid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }

    // Call to metadata server
    const payload = await deleteComment(videoid, user.uid);

    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}
