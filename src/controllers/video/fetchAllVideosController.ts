import { Request, Response } from "express";
import { fetchAllVideos } from "../../helper/apiCalls/video";

export default async function fetchAllVideosController(
  req: Request,
  res: Response
) {
  try {
    const payload = await fetchAllVideos();
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
