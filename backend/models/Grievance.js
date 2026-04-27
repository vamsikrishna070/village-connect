import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending",
    },
    userId: mongoose.Schema.Types.ObjectId,
    adminResponse: String,
  },
  { timestamps: true }
);

const Grievance = mongoose.model("Grievance", grievanceSchema);

export default Grievance;
