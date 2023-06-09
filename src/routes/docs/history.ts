import { Request, Response, Router } from "express";
import { db } from "../../global";
const router = Router();
import { Document, documentTypes } from "../../types/document";
import { checkPermission } from "../../utils/checkPermission";
import { getAuth } from "../../middlewares/getAuth";

router.get("/:name", getAuth, async (req: Request, res: Response) => {
  const type = req.query.type || documentTypes.DOCUMENT;
  const docs: Array<Document> = await db("documents")
    .select()
    .where("name", req.params.name)
    .andWhere("type", type)
    .orderBy("version", "desc");
  if (!docs) return res.status(404).json({ ok: false, status: "Docs:1" });
  const history: Array<Document> = [];
  for (const doc of docs) {
    if (await checkPermission(req.user.id, doc.read)) {
      history.push(doc);
    }
  }
  res.send({ ok: true, docs: history });
});
export default router;
