import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/genJwt";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["AccessToken"];
  const decoded = await verifyJwtToken(
    accessToken,
    process.env.ACCESS as string,
    res,
    req.cookies
  );
  if (!decoded) {
    res.status(403).json({ ok: false, status: "Auth:1" });
    return;
  }
  req.user = decoded;
  next();
};
