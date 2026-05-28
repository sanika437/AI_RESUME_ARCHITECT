const { generatePDF, buildResumeHTML, buildCoverLetterHTML } = require("../services/puppeteerService");

const downloadPDF = async (req, res) => {
  try {
    const { type, data, layout, accent } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: "Missing type or data" });
    }

    let htmlContent = "";
    let fileName = "document.pdf";

    if (type === "resume") {
      htmlContent = buildResumeHTML(data, layout, accent);
      fileName = "optimized_resume.pdf";
    } else if (type === "coverLetter") {
      htmlContent = buildCoverLetterHTML(data);
      fileName = "cover_letter.pdf";
    } else {
      return res.status(400).json({ error: "Invalid type. Must be 'resume' or 'coverLetter'" });
    }

    const pdfBuffer = await generatePDF(htmlContent);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.end(pdfBuffer, 'binary');
  } catch (error) {
    console.error("PDF download error:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};

module.exports = { downloadPDF };