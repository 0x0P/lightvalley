import { Router } from "express";
import { db } from "../../global";
import { Document, documentTypes } from "../../types/document";
import { createDocumentReqBody } from "../../types/req";
import * as crypto from "crypto";
import { makeKey } from "../../utils/makeKey";

const router = Router();
router.post("/", async (req, res) => {
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
    const hash = crypto.createHash("sha256");
    hash.update(req.ip + makeKey(10));
    const document: Document = {
      version: 1,
      type: documentTypes[type],
      author: hash.digest("hex"),
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
    res.status(500).json({ ok: false, error });
  }
});

export default router;
