import { Router } from "express";
import { getDashboardSummary, getRecentActivity, getGrievanceStats } from "../controllers/dashboardController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/dashboard/summary", requireAuth, getDashboardSummary);
router.get("/dashboard/recent-activity", requireAuth, getRecentActivity);
router.get("/dashboard/grievance-stats", requireAuth, getGrievanceStats);

export default router;
