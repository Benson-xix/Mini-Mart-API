const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// product name
//price
//category
//quantity

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
