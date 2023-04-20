import { ReqUser } from "../types/req";
import { genJwtToken } from "./genJwt";

export const genAccessToken = (user: ReqUser) => {
  return genJwtToken(user, process.env.ACCESS as string, "15m");
};
