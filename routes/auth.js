const express = require("express");
const { registerOwner, login, getProfile, verifyEmail, resendVerification } = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerOwner);
router.post("/login", login);
router.get("/me", authenticate, getProfile);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

module.exports = router;
