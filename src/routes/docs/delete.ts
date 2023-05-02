import { Request, Response, Router } from "express";
import { db } from "../../global";
import { Document, documentTypes } from "../../types/document";
import { checkPermission } from "../../utils/checkPermission";
import { getAuth } from "../../middlewares/getAuth";
import * as crypto from "crypto";
import { makeKey } from "../../utils/makeKey";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.delete("/:name", getAuth, async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({ ok: false, status: "Request:1" });
    }
    const type = req.query.type || documentTypes.DOCUMENT;
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
    const del: Document = {
      version: Number(document.version) + 1,
      type: document.type,
      author: crypto
        .createHash("sha256")
        .update(req.ip + makeKey(10))
        .digest("hex"),
      name: document.name,
      identifier: `${document.type}:${document.name}:${
        Number(document.version) + 1
      }`,
      displayname: document.displayname,
      content: "삭제됨",
      time: new Date(),
      read: document.read,
      edit: document.edit,
    };
    await db("documents").insert(del);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, status: "Server:1" });
  }
});

router.delete(
  "/admin/:name/:type",
  checkAuth,
  async (req: Request, res: Response) => {
    const { name, type } = req.params;
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
    db("documents")
      .select()
      .where("name", name)
      .andWhere("type", type)
      .del()
      .then(() => {
        res.status(200).json({ ok: true });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ ok: false, status: "Server:1" });
      });
  }
);

export default router;
