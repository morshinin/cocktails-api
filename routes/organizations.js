const express = require("express");
const { getOrganizations, createOrganization, updateOrganization } = require("../controllers/organizationController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, getOrganizations);
router.post("/", authenticate, createOrganization);
router.put("/:id", authenticate, updateOrganization);

module.exports = router;
