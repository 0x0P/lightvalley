import { Router } from "express";
const router = Router();

router.use("/docs", require("./docs").default);
router.use("/auth", require("./auth").default);

export default router;
