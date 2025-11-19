const express = require("express");
const { authenticate, requireRole } = require("../middleware/auth");
const { createVenue, getVenues } = require("../controllers/venueController");

const router = express.Router();

// Only owner or admin can create venues
router.post("/", authenticate, requireRole(["owner", "admin"]), createVenue);

// Any user of this organization can see venues
router.get("/", authenticate, getVenues);

module.exports = router;

