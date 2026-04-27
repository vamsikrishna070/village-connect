import { Router } from "express";
import { getJob, createJob, getJobById, updateJob, deleteJob } from "../controllers/jobController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/job", getJob);
router.post("/job", requireAuth, requireRole("admin", "provider"), createJob);
router.get("/job/:id", getJobById);
router.put("/job/:id", requireAuth, requireRole("admin", "provider"), updateJob);
router.delete("/job/:id", requireAuth, requireRole("admin", "provider"), deleteJob);

export default router;
