const mongoose = require("mongoose");

const sopVersionSchema = new mongoose.Schema(
  {
    applicationId: {
      type: Number,
      required: true,
    },

    versionNumber: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    wordCount: {
      type: Number,
      required: true,
    },

    summary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SopVersion", sopVersionSchema);