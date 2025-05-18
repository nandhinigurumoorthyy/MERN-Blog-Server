const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    userid: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel;
