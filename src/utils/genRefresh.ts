import { authReqbody } from "../types/req";
import { genJwtToken, verifyJwtToken } from "./genJwt";
import * as dotenv from "dotenv";

dotenv.config();

export const genRefreshToken = (user: authReqbody) => {
  return genJwtToken(user, process.env.REFRESH ?? "", "7d");
};

export const verifyRefreshToken = (accessToken: string) => {
  return verifyJwtToken(accessToken, process.env.REFRESH ?? "");
};
