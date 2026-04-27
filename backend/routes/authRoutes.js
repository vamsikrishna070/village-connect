import { Router } from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", requireAuth, getMe);

export default router;
