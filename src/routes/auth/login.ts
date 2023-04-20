import { Router } from "express";
import { db } from "../../global";
import bcrypt from "bcrypt";
import { User } from "../../types/user";
import { ReqUser, authReqbody } from "../../types/req";
import { genAccessToken } from "../../utils/genAccess";
import { genRefreshToken } from "../../utils/genRefresh";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, tag, pw }: authReqbody = req.body;
    const identifier = name + "#" + tag;
    const user: User = await db("users")
      .select()
      .where("identifier", identifier)
      .first();
    bcrypt.compare(pw, user.password).then(function (result) {
      if (result) {
        const userData: ReqUser = {
          id: user.id,
          name: user.name,
          tag: user.tag,
          identifier: user.identifier,
        };
        res.cookie("AccessToken", genAccessToken(userData), {
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
        });
        res.cookie("RefreshToken", genRefreshToken(userData), {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.send({ ok: true });
      } else {
        res.send({ ok: false });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
export default router;
