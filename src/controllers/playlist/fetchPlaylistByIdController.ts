import { Request, Response } from "express";
import { fetchPlaylistById } from "../../helper/apiCalls/playlist";

export default async function (req: Request, res: Response) {
  try {
    const id = req.params.id;

    const payload = await fetchPlaylistById(id);
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
