const express = require("express");
const router = express.Router();

const {
  analyzeJDController,
  optimizeResumeController,
  atsScoreController,
  coverLetterController,
  fullProcessController, // ✅ added
} = require("../controllers/aiController");

// 🔹 Analyze JD
router.post("/analyze-jd", analyzeJDController);

// 🔹 Optimize Resume
router.post("/optimize-resume", optimizeResumeController);

// 🔹 ATS Score
router.post("/ats-score", atsScoreController);

// 🔹 Cover Letter
router.post("/cover-letter", coverLetterController);

// 🔥 Full Process Pipeline
router.post("/full-process", fullProcessController);

// ✅ Export
module.exports = router;