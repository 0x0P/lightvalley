import { Router } from "express";
const router = Router();

router.use("/create", require("./create").default);
router.use("/login", require("./login").default);
router.use("/settings", require("./settings").default);
router.use("/delete", require("./delete").default);
router.use("/logout", require("./logout").default);
router.use("/get", require("./get").default);

export default router;
