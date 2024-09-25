import { Request, Response } from "express";
import { searchVideos } from "../../helper/apiCalls/video";

export default async function searchVideoController(
  req: Request,
  res: Response
) {
  try {
    const { s } = req.query;
    if (!s)
      return res.status(400).json({ message: "Search query is required" });
    const payload = await searchVideos(s as string);
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
