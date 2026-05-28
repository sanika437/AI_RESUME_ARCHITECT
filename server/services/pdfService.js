const PDFDocument = require("pdfkit");

// 🔹 Helper: Format text into sections
const formatText = (doc, text) => {
  const lines = text.split("\n");

  lines.forEach((line) => {
    line = line.trim();

    if (!line) {
      doc.moveDown(0.5);
    }

    // 🔹 Section Headings
    else if (
      line.toLowerCase().includes("summary") ||
      line.toLowerCase().includes("skills") ||
      line.toLowerCase().includes("projects") ||
      line.toLowerCase().includes("experience") ||
      line.toLowerCase().includes("education")
    ) {
      doc
        .moveDown(0.5)
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(line);

      doc.moveDown(0.3);
    }

    // 🔹 Bullet Points
    else if (line.startsWith("-") || line.startsWith("•")) {
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(line, { indent: 10 });
    }

    // 🔹 Normal Text
    else {
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(line, { lineGap: 4 });
    }
  });
};

// 🔹 Generate PDF
const generatePDF = (text, res, type = "resume") => {
  const doc = new PDFDocument({ margin: 50 });

  // 🔹 Dynamic filename
  const fileName =
    type === "cover-letter" ? "cover-letter.pdf" : "resume.pdf";

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  doc.pipe(res);

  // 🔹 Title
  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .text(type === "cover-letter" ? "Cover Letter" : "Resume", {
      align: "center",
    });

  doc.moveDown(1);

  // 🔹 Divider
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  doc.moveDown(1);

  // 🔹 Content
  formatText(doc, text);

  doc.end();
};

module.exports = { generatePDF };