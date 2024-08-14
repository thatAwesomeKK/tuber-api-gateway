import { Request, Response } from "express";
import { fetchVideoByTags } from "../../helper/apiCalls/video";

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params;

    const payload = await fetchVideoByTags(id);

    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
