import User from "../models/User.js";
import Job from "../models/Job.js";
import Grievance from "../models/Grievance.js";
import Agriculture from "../models/Agriculture.js";
import Healthcare from "../models/Healthcare.js";
import Education from "../models/Education.js";

const getDashboardSummary = async (_req, res) => {
  try {
    const [totalUsers, totalJobs, totalGrievances, resolvedGrievances, pendingGrievances, totalAgriculture, totalHealthcare, totalEducation] = await Promise.all([
      User.countDocuments(), Job.countDocuments(), Grievance.countDocuments(),
      Grievance.countDocuments({ status: "resolved" }), Grievance.countDocuments({ status: "pending" }),
      Agriculture.countDocuments(), Healthcare.countDocuments(), Education.countDocuments(),
    ]);
    res.json({
      totalJobs, totalGrievances, resolvedGrievances, pendingGrievances,
      totalUsers, totalAgricultureEntries: totalAgriculture,
      totalHealthcareEntries: totalHealthcare, totalEducationEntries: totalEducation,
    });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

const getRecentActivity = async (_req, res) => {
  try {
    const [recentJobs, recentGrievances] = await Promise.all([
      Job.find().sort({ createdAt: -1 }).limit(5).select("title createdAt").lean(),
      Grievance.find().sort({ updatedAt: -1 }).limit(5).select("title status updatedAt createdAt").lean(),
    ]);
    const activities = [
      ...recentJobs.map((j) => ({ id: `job-${j._id}`, type: "job_posted", title: "New Job Posted", description: j.title, createdAt: j.createdAt })),
      ...recentGrievances.map((g) => ({
        id: `grievance-${g._id}`,
        type: g.status === "resolved" ? "grievance_resolved" : "grievance_submitted",
        title: g.status === "resolved" ? "Grievance Resolved" : "Grievance Submitted",
        description: g.title, createdAt: g.updatedAt,
      })),
    ];
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(activities.slice(0, 10));
  } catch (error) { res.status(500).json({ error: error.message }); }
};

const getGrievanceStats = async (_req, res) => {
  try {
    const [pending, inProgress, resolved] = await Promise.all([
      Grievance.countDocuments({ status: "pending" }),
      Grievance.countDocuments({ status: "in_progress" }),
      Grievance.countDocuments({ status: "resolved" }),
    ]);
    res.json({ pending, inProgress, resolved });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

export { getDashboardSummary, getRecentActivity, getGrievanceStats };
