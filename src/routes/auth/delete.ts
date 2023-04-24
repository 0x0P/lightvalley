import { Request, Response, Router } from "express";
import { db } from "../../global";
import { User } from "../../types/user";
import bcrypt from "bcrypt";
import { checkAuth } from "../../middlewares/checkAuth";
const router = Router();

router.delete("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const { pw } = req.body;
    if (!pw) return res.status(400).json({ ok: false, status: "Request:1" });
    const user: User = await db("users")
      .select()
      .where("id", req.user.id)
      .first();
    bcrypt.compare(pw, user.password).then(function (result) {
      if (result) {
        db("users")
          .where("id", req.user.id)
          .del()
          .then(() => {
            res.clearCookie("AccessToken");
            res.clearCookie("RefreshToken");
            res.send({ ok: true });
          });
      } else {
        res.send({ ok: false, status: "Auth:2" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, status: "Server:1" });
  }
});

export default router;
