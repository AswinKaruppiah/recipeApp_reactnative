import mongoose from "mongoose";

const DietSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    number: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Diet", DietSchema);
