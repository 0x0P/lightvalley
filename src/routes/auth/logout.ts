import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/", checkAuth, async (req, res) => {
  try {
    res.clearCookie("RefreshToken");
    res.clearCookie("AccessToken");
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error });
  }
});
export default router;
