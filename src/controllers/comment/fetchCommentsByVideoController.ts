import { Request, Response } from "express";
import { fetchVideoComments } from "../../helper/apiCalls/comment";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid video id" });
    }
    const payload = await fetchVideoComments(id);
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}
