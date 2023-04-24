import { Request, Response, Router } from "express";
import { db } from "../../global";
const router = Router();
import { Document } from "../../types/document";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkPermission } from "../../utils/checkPermission";

router.get("/:name", checkAuth, async (req: Request, res: Response) => {
  const doc: Document = await db("documents")
    .select()
    .where("name", req.params.name)
    .first();
  if (doc) {
    if (await checkPermission(req.user.id, doc.read)) {
      res.status(200).json({ ok: true, doc });
    } else {
      res.status(403).json({ ok: false, status: "Docs:2" });
    }
  } else {
    res.status(404).json({ ok: false, status: "Docs:1" });
  }
});
export default router;
