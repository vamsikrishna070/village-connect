import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    salary: String,
    jobType: String,
    postedBy: mongoose.Schema.Types.ObjectId,
    appliedBy: [mongoose.Schema.Types.ObjectId],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
