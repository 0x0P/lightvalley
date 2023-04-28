import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/genJwt";

export const getAuth = async (
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
  req.user = decoded || { id: null, name: null, tag: null, identifier: null };
  next();
};
