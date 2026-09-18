const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    applicationId: {
      type: Number,
      required: true,
    },

    sopVersionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SopVersion",
      required: true,
    },

    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    scores: {
      specificity: {
        type: Number,
        min: 0,
        max: 100,
      },

      programFit: {
        type: Number,
        min: 0,
        max: 100,
      },

      clarity: {
        type: Number,
        min: 0,
        max: 100,
      },

      structure: {
        type: Number,
        min: 0,
        max: 100,
      },

      personality: {
        type: Number,
        min: 0,
        max: 100,
      },
    },

    cliches: [
      {
        sentence: String,
        reason: String,
        suggestion: String,
      },
    ],

    strengths: [String],

    weaknesses: [String],

    recommendations: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);