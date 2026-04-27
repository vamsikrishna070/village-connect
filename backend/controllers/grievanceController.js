import Grievance from "../models/Grievance.js";
import User from "../models/User.js";

const getGrievance = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;
    const isAdmin = req.user.role === "admin";
    const filter = isAdmin ? {} : { userId: req.user.id };
    const total = await Grievance.countDocuments(filter);
    const grievances = await Grievance.find(filter).sort({ createdAt: -1 }).skip(offset).limit(limitNum).lean();
    const userIds = [...new Set(grievances.map((g) => g.userId).filter(Boolean))];
    const users = await User.find({ _id: { $in: userIds } }).select("name").lean();
    const userMap = new Map(users.map((u) => [String(u._id), u.name]));
    const data = grievances.map((g) => ({
      id: g._id, userId: g.userId, userName: userMap.get(String(g.userId)) ?? "Unknown",
      title: g.title, description: g.description, status: g.status,
      adminResponse: g.adminResponse, createdAt: g.createdAt, updatedAt: g.updatedAt,
    }));
    res.json({ data, total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) });
  } catch (error) {
    console.error("Error fetching grievances:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const createGrievance = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) { res.status(400).json({ error: "Title is required" }); return; }
    const grievance = await Grievance.create({ title, description, userId: req.user.id });
    const user = await User.findById(grievance.userId).select("name").lean();
    res.status(201).json({
      id: grievance._id, userId: grievance.userId, userName: user?.name ?? "Unknown",
      title: grievance.title, description: grievance.description, status: grievance.status,
      adminResponse: grievance.adminResponse, createdAt: grievance.createdAt, updatedAt: grievance.updatedAt,
    });
  } catch (error) {
    console.error("Error creating grievance:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getGrievanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const grievance = await Grievance.findById(id).lean();
    if (!grievance) { res.status(404).json({ error: "Grievance not found" }); return; }
    const isAdmin = req.user.role === "admin";
    if (!isAdmin && String(grievance.userId) !== String(req.user.id)) {
      res.status(403).json({ error: "Forbidden" }); return;
    }
    const user = await User.findById(grievance.userId).select("name").lean();
    res.json({
      id: grievance._id, userId: grievance.userId, userName: user?.name ?? "Unknown",
      title: grievance.title, description: grievance.description, status: grievance.status,
      adminResponse: grievance.adminResponse, createdAt: grievance.createdAt, updatedAt: grievance.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching grievance:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateGrievanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;
    const grievance = await Grievance.findById(id);
    if (!grievance) { res.status(404).json({ error: "Grievance not found" }); return; }
    if (status) grievance.status = status;
    if (adminResponse !== undefined) grievance.adminResponse = adminResponse;
    grievance.updatedAt = new Date();
    await grievance.save();
    const user = await User.findById(grievance.userId).select("name").lean();
    res.json({
      id: grievance._id, userId: grievance.userId, userName: user?.name ?? "Unknown",
      title: grievance.title, description: grievance.description, status: grievance.status,
      adminResponse: grievance.adminResponse, createdAt: grievance.createdAt, updatedAt: grievance.updatedAt,
    });
  } catch (error) {
    console.error("Error updating grievance:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export { getGrievance, createGrievance, getGrievanceById, updateGrievanceStatus };
