import { Router } from "express";
import { getGrievance, createGrievance, getGrievanceById, updateGrievanceStatus } from "../controllers/grievanceController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/grievance", requireAuth, getGrievance);
router.post("/grievance", requireAuth, createGrievance);
router.get("/grievance/:id", requireAuth, getGrievanceById);
router.put("/grievance/:id", requireAuth, requireRole("admin"), updateGrievanceStatus);

export default router;
