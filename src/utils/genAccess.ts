import { authReqbody } from "../types/req";
import { genJwtToken, verifyJwtToken } from "./genJwt";
import * as dotenv from "dotenv";

dotenv.config();

export const genAccessToken = (user: authReqbody) => {
  return genJwtToken(user, process.env.ACCESS ?? "", "15m");
};

export const verifyAccessToken = (accessToken: string) => {
  return verifyJwtToken(accessToken, process.env.ACCESS ?? "");
};
