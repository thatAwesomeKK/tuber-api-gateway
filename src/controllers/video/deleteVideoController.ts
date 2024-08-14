import { Request, Response } from "express";
import {
  deleteVideoFromMetadataServer,
  deleteVideoFromUploadServer,
  fetchVideoMetadata,
} from "../../helper/apiCalls/video";

export default async function deleteVideoController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;

    const videoMetadata = await fetchVideoMetadata(id).then((res) => res.data);
    console.log(videoMetadata);

    const isDeleted = await deleteVideoFromUploadServer(
      videoMetadata.video.videoId
    );

    //Checking if video is deleted from upload server
    if (!isDeleted.success) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const payload = await deleteVideoFromMetadataServer(id);

    return res.status(payload.status).json(payload.data);
  } catch (error: any) {
    console.log(error?.response.data);
    return res.status(500).json({ message: "Internal server error" });
  }
}
