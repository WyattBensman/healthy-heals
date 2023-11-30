const { Schema, model } = require("mongoose");
const upload = require("../middleware/uploadMiddleware");
const { handleDishImage } = require("../middleware/dishMiddleware");

const dishSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  image: {
    type: String,
  },

  cookTime: {
    type: Number,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Breakfast", "Lunch", "Dinner", "Snacks", "Dessert"],
    trim: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: [
    {
      type: String,
      required: true,
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

// Middleware to handle file uploads before saving to the database
dishSchema.pre("save", upload.single("image"), handleDishImage);

const Dish = model("Dish", dishSchema);

module.exports = Dish;
