import { Request, Response } from "express";
import env from "../../helper/env";
import { streamMetadata } from "../../helper/apiCalls/video";

export default async function streamVideoController(
  req: Request,
  res: Response
) {
  try {
    const { fileid } = req.query;

    const payload = await streamMetadata(fileid as string);
    const videoId = payload.videoId;

    return res.status(200).json({
      success: true,
      videoLink: `${env.METADATA_SERVER_URL}/api/video/stream/${videoId}`,
      // videoLink: `http://192.168.29.13:5000/api/video/stream/${videoId}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
