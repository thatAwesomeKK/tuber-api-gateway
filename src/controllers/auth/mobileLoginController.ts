import { Request, Response } from "express";

export default async function (req: Request, res: Response) {
  const { token: accessToken } = req.query;
  try {
    return res.json({ success: true, token: accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
