import { Router } from "express";
const router = Router();

router.use("/read", require("./read").default);
router.use("/create", require("./create").default);
router.use("/delete", require("./delete").default);
router.use("/edit", require("./edit").default);

export default router;
