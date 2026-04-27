import mongoose from "mongoose";

const healthcareSchema = new mongoose.Schema(
  {
    information: { type: String, required: true },
    services: { type: String, required: true },
    title: String,
    category: { type: String, enum: ["information", "service", "scheme"] },
    content: String,
    contactInfo: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Healthcare = mongoose.model("Healthcare", healthcareSchema);

export default Healthcare;
