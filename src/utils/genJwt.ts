import * as jwt from "jsonwebtoken";
import { ReqUser } from "../types/req";
import { refreshToken } from "./refresh";
import { Response } from "express";
import { cookie } from "../types/cookie";

export const genJwtToken = (
  payload: ReqUser,
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyJwtToken = async (
  token: string,
  secretKey: string,
  res: Response,
  cookie: cookie
) => {
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return refreshToken(cookie.RefreshToken, res as Response);
  }
};
