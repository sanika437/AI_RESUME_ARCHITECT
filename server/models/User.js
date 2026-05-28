const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,   // ← changed: Google users have no password
      default: null,
    },
    googleId: {          // ← new field
      type: String,
      default: null,
    },
    name: {              // ← new field (Google provides a name)
      type: String,
      default: "",
    },
    avatar: {            // ← optional: Google profile picture
      type: String,
      default: "",
    },
    subscription: {
      type: String,
      enum: ['free', 'pro'],
      default: 'free'
    },
    stripeCustomerId: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);