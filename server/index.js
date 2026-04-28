const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const aiRoutes = require("./routes/aiRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Resume Builder API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



