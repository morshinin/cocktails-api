const express = require("express");
const { registerOwner, login, getProfile } = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerOwner);
router.post("/login", login);
router.get("/me", authenticate, getProfile);

module.exports = router;

