const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["resume", "cover_letter"],
      required: true,
    },
    title: {
      type: String,
      default: "Untitled Resume",
    },
    data: {
      type: mongoose.Schema.Types.Mixed, // Stores the parsed resume JSON
      required: true,
    },
    atsScore: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
