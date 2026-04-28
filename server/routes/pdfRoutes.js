const express = require("express");
const router = express.Router();
const multer = require("multer");
const { downloadResumePDF } = require("../controllers/pdfController");
const { extractTextFromPDF } = require("../controllers/extractController");

// Use memory storage so we don't save files to disk
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Generate downloadable PDF
router.post("/download", downloadResumePDF);

// Extract text from uploaded PDF/DOCX
router.post("/extract-text", upload.single("resume"), extractTextFromPDF);

module.exports = router;
