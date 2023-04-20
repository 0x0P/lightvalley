import { Response } from "express";
import { genAccessToken } from "./genAccess";
import { User } from "../types/user";
import { db } from "../global";
import * as jwt from "jsonwebtoken";
import { jwtUser } from "../types/jwt";

export const refreshToken = async (refreshToken: string, res: Response) => {
  try {
    const checkRefresh: jwtUser = jwt.verify(
      refreshToken,
      process.env.REFRESH as string
    ) as jwtUser;
    const user: User = await db("users")
      .select()
      .where("id", checkRefresh.id)
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
      throw new Error("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "RefreshToken이 잘못됐어요" });
  }
};
