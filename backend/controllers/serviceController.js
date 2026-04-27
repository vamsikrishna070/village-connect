import Agriculture from "../models/Agriculture.js";
import Healthcare from "../models/Healthcare.js";
import Education from "../models/Education.js";
import Environmental from "../models/Environmental.js";

// ==================== AGRICULTURE ====================
const getAgriculture = async (_req, res) => {
  try {
    const items = await Agriculture.find().sort({ createdAt: -1 }).lean();
    res.json(items.map((i) => ({ ...i, id: i._id })));
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const createAgriculture = async (req, res) => {
  try {
    const item = await Agriculture.create(req.body);
    res.status(201).json({ ...item.toObject(), id: item._id });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const updateAgriculture = async (req, res) => {
  try {
    const item = await Agriculture.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    if (!item) { res.status(404).json({ error: "Entry not found" }); return; }
    res.json({ ...item.toObject(), id: item._id });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const deleteAgriculture = async (req, res) => {
  try {
    const item = await Agriculture.findByIdAndDelete(req.params.id);
    if (!item) { res.status(404).json({ error: "Entry not found" }); return; }
    res.sendStatus(204);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// ==================== HEALTHCARE ====================
const getHealthcare = async (_req, res) => {
  try {
    const items = await Healthcare.find().sort({ createdAt: -1 }).lean();
    res.json(items.map((i) => ({ ...i, id: i._id })));
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const createHealthcare = async (req, res) => {
  try {
    const item = await Healthcare.create(req.body);
    res.status(201).json({ ...item.toObject(), id: item._id });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const updateHealthcare = async (req, res) => {
  try {
    const item = await Healthcare.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    if (!item) { res.status(404).json({ error: "Entry not found" }); return; }
    res.json({ ...item.toObject(), id: item._id });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const deleteHealthcare = async (req, res) => {
  try {
    const item = await Healthcare.findByIdAndDelete(req.params.id);
    if (!item) { res.status(404).json({ error: "Entry not found" }); return; }
    res.sendStatus(204);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// ==================== EDUCATION ====================
const getEducation = async (_req, res) => {
  try {
    const items = await Education.find().sort({ createdAt: -1 }).lean();
    res.json(items.map((i) => ({ ...i, id: i._id })));
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const createEducation = async (req, res) => {
  try {
    const item = await Education.create(req.body);
    res.status(201).json({ ...item.toObject(), id: item._id });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const updateEducation = async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() }, { new: true });
    if (!item) { res.status(404).json({ error: "Entry not found" }); return; }
    res.json({ ...item.toObject(), id: item._id });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const deleteEducation = async (req, res) => {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) { res.status(404).json({ error: "Entry not found" }); return; }
    res.sendStatus(204);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// ==================== ENVIRONMENTAL ====================
const getEnvironmental = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };
    const total = await Environmental.countDocuments(filter);
    const items = await Environmental.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit)).lean();
    res.json({ data: items, total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / limit) });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const getEnvironmentalById = async (req, res) => {
  try {
    const item = await Environmental.findById(req.params.id);
    if (!item) { res.status(404).json({ error: "Environmental content not found" }); return; }
    res.json(item);
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const createEnvironmental = async (req, res) => {
  try {
    const { title, description, category, content, imageUrl, resources } = req.body;
    if (!title || !category) { res.status(400).json({ error: "Title and category are required" }); return; }
    const validCategories = ["soil", "water", "air", "climate", "renewable", "waste", "biodiversity"];
    if (!validCategories.includes(category)) {
      res.status(400).json({ error: `Invalid category. Must be one of: ${validCategories.join(", ")}` }); return;
    }
    const newItem = await Environmental.create({ title, description, category, content, imageUrl, resources: resources || [], providerId: req.user.id });
    res.status(201).json(newItem);
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const updateEnvironmental = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, content, imageUrl, resources } = req.body;
    const item = await Environmental.findById(id);
    if (!item) { res.status(404).json({ error: "Environmental content not found" }); return; }
    if (item.providerId && item.providerId.toString() !== req.user.id && req.user.role !== "admin") {
      res.status(403).json({ error: "Not authorized to update this content" }); return;
    }
    if (title) item.title = title;
    if (description) item.description = description;
    if (category) {
      const validCategories = ["soil", "water", "air", "climate", "renewable", "waste", "biodiversity"];
      if (!validCategories.includes(category)) {
        res.status(400).json({ error: `Invalid category. Must be one of: ${validCategories.join(", ")}` }); return;
      }
      item.category = category;
    }
    if (content) item.content = content;
    if (imageUrl) item.imageUrl = imageUrl;
    if (resources) item.resources = resources;
    const updated = await item.save();
    res.json(updated);
  } catch (error) { res.status(500).json({ error: error.message }); }
};
const deleteEnvironmental = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Environmental.findById(id);
    if (!item) { res.status(404).json({ error: "Environmental content not found" }); return; }
    if (item.providerId && item.providerId.toString() !== req.user.id && req.user.role !== "admin") {
      res.status(403).json({ error: "Not authorized to delete this content" }); return;
    }
    await Environmental.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) { res.status(500).json({ error: error.message }); }
};

export {
  getAgriculture, createAgriculture, updateAgriculture, deleteAgriculture,
  getHealthcare, createHealthcare, updateHealthcare, deleteHealthcare,
  getEducation, createEducation, updateEducation, deleteEducation,
  getEnvironmental, getEnvironmentalById, createEnvironmental, updateEnvironmental, deleteEnvironmental,
};
