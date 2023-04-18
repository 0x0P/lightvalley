import { Router } from "express";
import { db } from "../../global";
const router = Router();
import { Document } from "../../types/document";

router.get("/:name", async (req, res) => {
  try {
    const doc: Document = await db("documents")
      .select()
      .where("name", req.params.name)
      .first();
    if (doc) {
      res.status(200).json({ ok: true, doc });
    } else {
      res.status(404).json({ ok: false, error: "문서를 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
});
export default router;
