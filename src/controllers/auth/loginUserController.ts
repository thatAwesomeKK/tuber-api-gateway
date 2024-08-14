import { Request, Response } from "express";
import cookieConfig from "../../config/cookieConfig";
import env from "../../helper/env";

export default async function (req: Request, res: Response) {
  const { token: accessToken } = req.query;
  try {
    res.cookie("accessToken", accessToken, cookieConfig("accessToken"));
    return res.redirect(env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
