import { Router } from "express";
import { db } from "../../global";
const router = Router();

router.get("/read/:id", (req, res) => {
  res.send(`${req.params.id} PAGE.`);
});

export default router;
