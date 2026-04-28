const pdfParse = require("pdf-parse");

/**
 * Extract text from an uploaded PDF or DOCX file.
 * Expects multipart/form-data with field "resume".
 */
const extractTextFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const { originalname, buffer, mimetype } = req.file;
    const ext = originalname.split(".").pop().toLowerCase();

    let text = "";

    if (ext === "pdf" || mimetype === "application/pdf") {
      // Extract text from PDF
      const pdfData = await pdfParse(buffer);
      text = pdfData.text || "";
    } else if (ext === "txt" || mimetype === "text/plain") {
      text = buffer.toString("utf-8");
    } else if (ext === "docx" || mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      // Basic DOCX text extraction using xml parsing
      const AdmZip = require("adm-zip");
      try {
        const zip = new AdmZip(buffer);
        const wordDoc = zip.getEntry("word/document.xml");
        if (wordDoc) {
          const xmlContent = wordDoc.getData().toString("utf-8");
          // Strip XML tags to get plain text
          text = xmlContent
            .replace(/<w:t[^>]*>/gi, " ")
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim();
        }
      } catch (docxErr) {
        console.error("DOCX parse error:", docxErr.message);
        text = "Could not extract text from DOCX file.";
      }
    } else {
      return res.status(400).json({ success: false, error: "Unsupported file type. Please upload PDF, DOCX, or TXT." });
    }

    if (!text || text.trim().length < 20) {
      return res.status(422).json({
        success: false,
        error: "Could not extract readable text from the file. The PDF may be image-based or scanned. Please try a text-based PDF.",
      });
    }

    // Clean up the extracted text
    text = text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return res.json({ success: true, text, charCount: text.length });
  } catch (error) {
    console.error("Text extraction error:", error);
    return res.status(500).json({ success: false, error: "Failed to extract text: " + error.message });
  }
};

module.exports = { extractTextFromPDF };
