const express = require("express");
const router = express.Router();

const { downloadResumePDF } = require("../controllers/pdfController");

// 🔹 Download PDF
router.post("/download", downloadResumePDF);

module.exports = router;