import mongoose from "mongoose";

const CuisineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cuisine", CuisineSchema);
