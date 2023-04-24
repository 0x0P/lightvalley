import { Request, Response, Router } from "express";
import { db } from "../../global";
import bcrypt from "bcrypt";
import { User, permission } from "../../types/user";
import { authReqbody } from "../../types/req";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, tag, pw }: authReqbody = req.body;
    if (!name || !tag || !pw)
      return res.status(400).json({ ok: false, error: "Request:1" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    const user: User = {
      name,
      tag,
      identifier: name + "#" + tag,
      password: hash,
      time: new Date(),
      permission: permission.user,
    };
    await db("users").insert(user);
    res.status(201).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error });
  }
});

export default router;
