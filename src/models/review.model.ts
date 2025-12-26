import { Schema, model } from "mongoose";

const ReviewSchema = new Schema(
  {
    entity1Id: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const ReviewModel = model("Review", ReviewSchema);