import { Request, Response } from "express";
import { createPlaylist } from "../../helper/apiCalls/playlist";

export default async function (req: Request, res: Response) {
  try {
    const user = req.user;
    const { name, videoId } = req.body;
    if (!name || !videoId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const payload = await createPlaylist({ name, userId: user.uid, videoId });
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
