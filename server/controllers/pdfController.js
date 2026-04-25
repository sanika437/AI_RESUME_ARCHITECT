const { generatePDF } = require("../services/pdfService");

// 🔹 Resume PDF
const downloadResumePDF = (req, res) => {
  try {
    const { text } = req.body;

    generatePDF(text, res);
  } catch (error) {
    res.status(500).json({ error: "Error generating PDF" });
  }
};

module.exports = { downloadResumePDF };