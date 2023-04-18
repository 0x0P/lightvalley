import { Router } from "express";
import { db } from "../../global";
import { Document, documentTypes } from "../../types/document";
import { createDocumentReqBody } from "../../types/req";
import * as crypto from "crypto";
import { makeKey } from "../../utils/makeKey";

const router = Router();
router.post("/", async (req, res) => {
  try {
    const { name, displayName, content, type }: createDocumentReqBody =
      req.body;
    if (![name, displayName, content, type].every(Boolean))
      return res.status(400).json({ ok: false });
    const hash = crypto.createHash("sha256");
    hash.update(req.ip + makeKey(10));

    const document: Document = {
      version: 1,
      type: documentTypes[type],
      author: hash.digest("hex"),
      name,
      displayname: displayName,
      content,
      read: 0,
      edit: 0,
    };

    await db("documents").insert(document);
    res.status(200).json({ ok: true, document: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
});

export default router;
