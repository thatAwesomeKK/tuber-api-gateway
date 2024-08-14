import { NextFunction, Request, Response } from "express";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (user.signInMethod === "guest") {
      return res
        .status(401)
        .json({ success: false, message: "Guests cannot do this operation" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal Server Error" });
  }
}
