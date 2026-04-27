import mongoose from "mongoose";

const environmentalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: String,
      enum: ["soil", "water", "air", "climate", "renewable", "waste", "biodiversity"],
      required: true,
    },
    content: String,
    imageUrl: String,
    resources: [String],
    providerId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Environmental = mongoose.model("Environmental", environmentalSchema);

export default Environmental;
