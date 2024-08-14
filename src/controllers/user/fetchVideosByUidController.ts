import { Request, Response } from "express";
import { getVideosByUid } from "../../helper/apiCalls/user";

export default async function (req: Request, res: Response) {
  try {
    const user = req.user;
    const payload = await getVideosByUid(user.uid);
    
    return res.status(payload.status).json(payload.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
