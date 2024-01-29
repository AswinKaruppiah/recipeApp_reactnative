import mongoose from "mongoose";

const Recipeschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    cuisine: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
    diet: {
      type: String,
      required: false,
    },
    ingredients_name: {
      type: String,
      required: false,
    },
    ingredients_quantity: {
      type: String,
      required: false,
    },
    prep_time: {
      type: Number,
      required: false,
    },
    cook_time: {
      type: Number,
      required: false,
    },
    instructions: {
      type: String,
      required: false,
    },
    image_url: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Recipe", Recipeschema);
