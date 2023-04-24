import { Request, Response, Router } from "express";
import { db } from "../../global";
import { Document } from "../../types/document";
import { editDocumentReqBody } from "../../types/req";
import * as crypto from "crypto";
import { makeKey } from "../../utils/makeKey";
import { checkPermission } from "../../utils/checkPermission";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.put("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const {
      name,
      type,
      displayName,
      content,
      read,
      edit,
    }: editDocumentReqBody = req.body;
    if (![name, type].every(Boolean))
      return res.status(400).json({ ok: false });
    const hash = crypto.createHash("sha256");
    hash.update(req.ip + makeKey(10));
    const document = await db<Document>("documents")
      .select()
      .where("name", "=", name)
      .andWhere("type", "=", type)
      .orderBy("time", "desc")
      .limit(1)
      .first();
    if (document) {
      if (await checkPermission(req.user.id, document.edit)) {
        const newDocument: Document = {
          version: Number(document.version) + 1,
          type: type,
          author: hash.digest("hex"),
          name: name || document.name,
          identifier: `${type}:${name}:${Number(document.version) + 1}`,
          displayname: displayName || document.displayname,
          content: content || document.content,
          time: new Date(),
          read: read || document.read,
          edit: edit || document.edit,
        };
        await db("documents").insert(newDocument);
        res.status(200).json({ ok: true });
      } else {
        res.status(403).json({ ok: false, error: "권한이 없어요." });
      }
    } else {
      res.status(404).json({ ok: false, error: "문서를 찾을 수 없어요." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err });
  }
});

export default router;
