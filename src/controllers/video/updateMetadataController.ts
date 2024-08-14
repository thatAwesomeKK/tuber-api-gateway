import { Request, Response } from "express";
import { updateMetadata } from "../../helper/apiCalls/video";

export default async function updateMetadataController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const body = req.body;

    const payload = await updateMetadata(id, body);

    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
