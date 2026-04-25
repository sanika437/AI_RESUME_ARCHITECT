const express = require("express");
const app = express();
const pdfRoutes = require("./routes/pdfRoutes");

app.use(express.json());

const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



