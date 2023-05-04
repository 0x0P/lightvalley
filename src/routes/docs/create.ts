import { Request, Response, Router } from "express";
import { db } from "../../global";
import { Document, documentTypes } from "../../types/document";
import { createDocumentReqBody } from "../../types/req";
import * as crypto from "crypto";
import { makeKey } from "../../utils/makeKey";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();
router.post("/", checkAuth, async (req: Request, res: Response) => {
  try {
    const {
      name,
      displayName,
      content,
      type,
      read,
      edit,
    }: createDocumentReqBody = req.body;
    if (![name, displayName, content, type].every(Boolean))
      return res.status(400).json({ ok: false });
    const document: Document = {
      version: 1,
      type: documentTypes[type],
      author:
        req.user.identifier ||
        crypto
          .createHash("sha256")
          .update(req.ip + makeKey(15))
          .digest("hex"),
      name,
      identifier: `${type}:${name}:1`,
      displayname: displayName,
      content,
      time: new Date(),
      read: read || 3,
      edit: edit || 3,
    };

    await db("documents").insert(document);
    res.status(200).json({ ok: true, document: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, status: "Server:1" });
  }
});

export default router;
