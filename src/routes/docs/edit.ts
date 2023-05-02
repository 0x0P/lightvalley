import { Request, Response, Router } from "express";
import { db } from "../../global";
import { Document } from "../../types/document";
import { editDocumentReqBody } from "../../types/req";
import * as crypto from "crypto";
import { makeKey } from "../../utils/makeKey";
import { checkPermission } from "../../utils/checkPermission";
import { getAuth } from "../../middlewares/getAuth";

const router = Router();

router.put("/", getAuth, async (req: Request, res: Response) => {
  try {
    const {
      name,
      type,
      displayName,
      content,
      read,
      edit,
    }: editDocumentReqBody = req.body;

    if (!name || !type) {
      return res.status(400).json({ ok: false, status: "Request:1" });
    }

    const document = await db<Document>("documents")
      .select()
      .where("name", name)
      .andWhere("type", type)
      .orderBy("version", "desc")
      .limit(1)
      .first();

    if (!document) {
      return res.status(404).json({ ok: false, status: "Docs:1" });
    }

    const canEdit = await checkPermission(req.user.id, document.edit);
    if (!canEdit) {
      return res.status(403).json({ ok: false, status: "Docs:3" });
    }

    const newEdit = (await checkPermission(req.user.id, Number(edit)))
      ? Number(edit)
      : document.edit;
    const newRead = (await checkPermission(req.user.id, Number(read)))
      ? Number(read)
      : document.read;

    const newDocument: Document = {
      version: Number(document.version + 1),
      type: document.type,
      author: crypto
        .createHash("sha256")
        .update(req.ip + makeKey(10))
        .digest("hex"),
      name: name,
      identifier: `${document.type}:${name}:${Number(document.version + 1)}`,
      displayname: displayName || document.displayname,
      content: content || document.content,
      time: new Date(),
      read: newRead,
      edit: newEdit,
    };

    const checkBeforeDocument = {
      type: document.type,
      name: document.name,
      displayName: document.displayname,
      content: document.content,
      read: document.read,
      edit: document.edit,
    };

    const checkNewDocument = {
      type: newDocument.type,
      name: newDocument.name,
      displayName: newDocument.displayname,
      content: newDocument.content,
      read: newDocument.read,
      edit: newDocument.edit,
    };

    if (
      JSON.stringify(checkBeforeDocument) === JSON.stringify(checkNewDocument)
    ) {
      return res.status(400).json({ ok: false, status: "Docs:4" });
    }

    await db("documents").insert(newDocument);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, status: "Server:1" });
  }
});

export default router;
