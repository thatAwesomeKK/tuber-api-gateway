import { Request, Response } from "express";
import { updatePlaylist } from "../../helper/apiCalls/playlist";

export default async function (req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const payload = await updatePlaylist({ name }, id);
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
