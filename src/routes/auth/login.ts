import { Router } from "express";
import { db } from "../../global";
import bcrypt from "bcrypt";
import { User } from "../../types/user";
import jwt from "jsonwebtoken";
import { authReqbody } from "../../types/req";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, tag, pw }: authReqbody = req.body;
    const identifier = name + "#" + tag;
    const user: User = await db("users")
      .select()
      .where("identifier", identifier)
      .first();
    console.log(user);
    bcrypt.compare(pw, user.password).then(function (result) {
      res.send({ ok: result });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
export default router;
