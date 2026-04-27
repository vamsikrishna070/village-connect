import Job from "../models/Job.js";
import User from "../models/User.js";

/**
 * GET /jobs
 * List all jobs with search, location filter, and pagination
 */
const getJob = async (req, res) => {
  try {
    const { search, location, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limitNum)
      .lean();

    // Populate postedByName for each job
    const userIds = [...new Set(jobs.map((j) => j.postedBy).filter(Boolean))];
    const users = await User.find({ _id: { $in: userIds } })
      .select("name")
      .lean();
    const userMap = new Map(users.map((u) => [String(u._id), u.name]));

    const data = jobs.map((j) => ({
      id: j._id,
      title: j.title,
      description: j.description,
      location: j.location,
      salary: j.salary,
      postedBy: j.postedBy,
      postedByName: userMap.get(String(j.postedBy)) ?? "Unknown",
      createdAt: j.createdAt,
    }));

    res.json({
      data,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * POST /jobs
 * Create a new job posting
 */
const createJob = async (req, res) => {
  try {
    const { title, description, location, salary } = req.body;

    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      postedBy: req.user.id,
    });

    const user = await User.findById(job.postedBy).select("name").lean();

    res.status(201).json({
      id: job._id,
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      postedBy: job.postedBy,
      postedByName: user?.name ?? "Unknown",
      createdAt: job.createdAt,
    });
  } catch (error) {
    console.error("Error creating job:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * GET /jobs/:id
 * Get a single job by ID
 */
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).lean();

    if (!job) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    const user = await User.findById(job.postedBy).select("name").lean();

    res.json({
      id: job._id,
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      postedBy: job.postedBy,
      postedByName: user?.name ?? "Unknown",
      createdAt: job.createdAt,
    });
  } catch (error) {
    console.error("Error fetching job:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * PUT /jobs/:id
 * Update a job posting
 */
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, salary } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    if (title !== undefined) job.title = title;
    if (description !== undefined) job.description = description;
    if (location !== undefined) job.location = location;
    if (salary !== undefined) job.salary = salary;

    await job.save();

    const user = await User.findById(job.postedBy).select("name").lean();

    res.json({
      id: job._id,
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      postedBy: job.postedBy,
      postedByName: user?.name ?? "Unknown",
      createdAt: job.createdAt,
    });
  } catch (error) {
    console.error("Error updating job:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * DELETE /jobs/:id
 * Delete a job posting
 */
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting job:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export { getJob, createJob, getJobById, updateJob, deleteJob };
