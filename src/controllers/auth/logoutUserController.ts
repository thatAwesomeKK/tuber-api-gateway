import { Request, Response } from "express";
import cookieConfig from "../../config/cookieConfig";
import env from "../../helper/env";

export default async function (req: Request, res: Response) {
  try {
    res.clearCookie("accessToken", cookieConfig("accessToken"));
    res.clearCookie("profilePicture", cookieConfig("profilePicture"));
    return res.redirect(env.CLIENT_URL);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
