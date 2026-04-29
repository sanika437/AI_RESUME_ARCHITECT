const express = require("express");
const router = express.Router();
const { signup, signin, googleRedirect, googleCallback } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);

// Google OAuth routes
router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);

module.exports = router;