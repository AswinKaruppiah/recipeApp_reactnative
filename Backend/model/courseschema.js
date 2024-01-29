import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
