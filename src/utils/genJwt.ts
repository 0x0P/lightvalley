import * as jwt from "jsonwebtoken";
import { authReqbody } from "../types/req";

export const genJwtToken = (
  payload: authReqbody,
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyJwtToken = (token: string, secretKey: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("토근이 유효하지 않아요.");
  }
};
