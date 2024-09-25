import { Request, Response } from "express";
import { fetchPlaylistByUserId } from "../../helper/apiCalls/playlist";

export default async function (req: Request, res: Response) {
  try {
    const user = req.user;

    const payload = await fetchPlaylistByUserId(user.uid);
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
