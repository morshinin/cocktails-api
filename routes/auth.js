const express = require("express");
const { registerOwner, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerOwner);
router.post("/login", login);

module.exports = router;

