import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    resources: { type: String, required: true },
    courses: { type: String, required: true },
    title: String,
    category: { type: String, enum: ["course", "resource", "scholarship"] },
    content: String,
    link: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

export default Education;
