const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getProfile, getUserHistory, saveToHistory, createCheckoutSession } = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.get("/history", protect, getUserHistory);
router.post("/history", protect, saveToHistory);
router.post("/checkout", protect, createCheckoutSession);

module.exports = router;
