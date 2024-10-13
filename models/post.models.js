const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image: {
      type: {
        image_url: {
          type: String,
          required: true,
        },
        cloudnary_id: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("post", Schema);
module.exports = model;
