import { ReqUser } from "../types/req";
import { genJwtToken } from "./genJwt";

export const genRefreshToken = (user: ReqUser) => {
  return genJwtToken(user, process.env.REFRESH as string, "7d");
};
