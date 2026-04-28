const express = require("express");
const router = express.Router();

const {
  analyzeJDController,
  atsScoreController,
  coverLetterController,
  coverLetterStreamController,
  rewriteBulletController,
  fullProcessController,
} = require("../controllers/aiController");

// Core pipeline — used by OptimizedResumeView
router.post("/full-process", fullProcessController);

// JD Analysis Agent
router.post("/analyze-jd", analyzeJDController);

// ATS Score
router.post("/ats-score", atsScoreController);

// Cover Letter (non-streaming)
router.post("/cover-letter", coverLetterController);

// Cover Letter SSE Streaming (typing effect)
router.post("/cover-letter-stream", coverLetterStreamController);

// AI Magic Button — rewrite bullet with keyword
router.post("/rewrite-bullet", rewriteBulletController);

module.exports = router;
