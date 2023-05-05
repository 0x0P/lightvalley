import { Response } from "express";
import { genAccessToken } from "./genAccess";
import { User } from "../types/user";
import { db } from "../global";
import * as jwt from "jsonwebtoken";
import { jwtUser } from "../types/jwt";

export const refreshToken = async (refreshToken: string, res: Response) => {
  try {
    if (!refreshToken) return null;
    const checkRefresh: jwtUser = jwt.verify(
      refreshToken,
      process.env.REFRESH as string
    ) as jwtUser;
    const user = await db<User>("users")
      .select("id", "name", "tag", "identifier")
      .where("identifier", checkRefresh.identifier)
      .first();
    if (user) {
      const userData = {
        id: user.id,
        name: user.name,
        tag: user.tag,
        identifier: user.identifier,
      };
      const accessToken = genAccessToken(userData);
      res.cookie("AccessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      });
      return jwt.verify(accessToken, process.env.ACCESS as string);
    } else {
      res.status(404).json({ ok: false, status: "Auth:1/TEST" });
    }
  } catch (error) {
    console.error(error);
    res.status(403).json({ ok: false, status: "Request : 2" });
  }
};
