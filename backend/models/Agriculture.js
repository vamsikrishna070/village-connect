import mongoose from "mongoose";

const agricultureSchema = new mongoose.Schema(
  {
    tips: { type: String, required: true },
    schemes: { type: String, required: true },
    title: String,
    category: { type: String, enum: ["tip", "scheme", "news"] },
    content: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Agriculture = mongoose.model("Agriculture", agricultureSchema);

export default Agriculture;
