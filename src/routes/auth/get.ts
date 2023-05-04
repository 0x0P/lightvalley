import { Router } from "express";
import { db } from "../../global";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const raw = await db("users")
      .select()
      .where("identifier", req.query.identifier)
      .first();
    if (!raw) return res.status(404).json({ ok: false, status: "User:1" });
    const user = {
      id: raw.id,
      name: raw.name,
      tag: raw.tag,
      identifier: raw.identifier,
      permission: raw.permission,
      time: raw.time,
    };
    res.status(200).json({ ok: true, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, status: "Server:1" });
  }
});
export default router;
