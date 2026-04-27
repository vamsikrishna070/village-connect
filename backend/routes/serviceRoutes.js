import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import {
  getAgriculture, createAgriculture, updateAgriculture, deleteAgriculture,
  getHealthcare, createHealthcare, updateHealthcare, deleteHealthcare,
  getEducation, createEducation, updateEducation, deleteEducation,
  getEnvironmental, getEnvironmentalById, createEnvironmental, updateEnvironmental, deleteEnvironmental,
} from "../controllers/serviceController.js";

const router = Router();

// Agriculture routes
router.get("/agriculture", getAgriculture);
router.post("/agriculture", requireAuth, requireRole("admin"), createAgriculture);
router.put("/agriculture/:id", requireAuth, requireRole("admin"), updateAgriculture);
router.delete("/agriculture/:id", requireAuth, requireRole("admin"), deleteAgriculture);

// Healthcare routes
router.get("/healthcare", getHealthcare);
router.post("/healthcare", requireAuth, requireRole("admin"), createHealthcare);
router.put("/healthcare/:id", requireAuth, requireRole("admin"), updateHealthcare);
router.delete("/healthcare/:id", requireAuth, requireRole("admin"), deleteHealthcare);

// Education routes
router.get("/education", getEducation);
router.post("/education", requireAuth, requireRole("admin"), createEducation);
router.put("/education/:id", requireAuth, requireRole("admin"), updateEducation);
router.delete("/education/:id", requireAuth, requireRole("admin"), deleteEducation);

// Environmental routes
router.get("/environmental", getEnvironmental);
router.get("/environmental/:id", getEnvironmentalById);
router.post("/environmental", requireAuth, requireRole("admin", "provider"), createEnvironmental);
router.patch("/environmental/:id", requireAuth, requireRole("admin", "provider"), updateEnvironmental);
router.delete("/environmental/:id", requireAuth, requireRole("admin", "provider"), deleteEnvironmental);

export default router;
