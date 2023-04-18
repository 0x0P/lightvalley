import { Router } from "express";
import { db } from "../../global";
const router = Router();
import { Document, documentTypes } from "../../types/document";
router.post("/", async (req, res) => {
  try {
    const {
      name,
      displayName,
      content,
      type,
    }: {
      name: string;
      displayName: string;
      content: string;
      type: documentTypes;
    } = req.body;
    if (![name, displayName, content, type].every(Boolean))
      return res.status(400).json({ ok: false });
    const document: Document = {
      version: 1,
      type: documentTypes[type],
      author: req.ip,
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
