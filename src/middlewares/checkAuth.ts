import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/genJwt";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies["AccessToken"];
  const decoded = verifyJwtToken(
    accessToken,
    process.env.ACCESS as string,
    res,
    req.cookies
  );
  req.user = decoded;
  next();
};
