import { Request, Response } from "express";

export default async function (req: Request, res: Response) {
  try {
    const user = req.user;
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
