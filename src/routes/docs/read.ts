import { Request, Response, Router } from "express";
import { db } from "../../global";
const router = Router();
import { Document, documentTypes } from "../../types/document";
import { checkPermission } from "../../utils/checkPermission";
import { getAuth } from "../../middlewares/getAuth";

router.get("/:name", getAuth, async (req: Request, res: Response) => {
  const doc: Document = await db("documents")
    .select()
    .where("name", req.params.name)
    .andWhere("type", req.params.type || documentTypes.DOCUMENT)
    .orderBy("version", "desc")
    .limit(1)
    .first();
  if (doc) {
    if (await checkPermission(req.user.id || 3, doc.read)) {
      res.status(200).json({ ok: true, doc });
    } else {
      res.status(403).json({ ok: false, status: "Docs:2" });
    }
  } else {
    res.status(404).json({ ok: false, status: "Docs:1" });
  }
});
export default router;
