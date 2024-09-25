import { Request, Response } from "express";
import { handlePlaylistVids } from "../../helper/apiCalls/playlist";

export default async function (req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { videoId } = req.body;
    if (!id || !videoId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const payload = await handlePlaylistVids(id, { videoId });
    console.log(payload);
    
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
