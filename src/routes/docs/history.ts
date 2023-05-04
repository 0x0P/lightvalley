import { Request, Response, Router } from "express";
import { db } from "../../global";
const router = Router();
import { Document, documentTypes } from "../../types/document";
import { checkPermission } from "../../utils/checkPermission";
import { getAuth } from "../../middlewares/getAuth";

router.get("/:name", getAuth, async (req: Request, res: Response) => {
  const docs: Array<Document> = await db("documents")
    .select()
    .where("name", req.params.name)
    .andWhere("type", req.query.type || documentTypes.DOCUMENT)
    .orderBy("version", "desc");
  const history: Array<Document> = [];
  docs.map(async (doc: Document) => {
    if (await checkPermission(req.user.id, doc.read)) {
      history.push(doc);
      console.log(history);
    }
  });
  res.send({ docs: history });
});
export default router;
