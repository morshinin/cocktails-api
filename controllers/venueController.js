const Venue = require("../models/Venue");
const Organization = require("../models/Organization");

module.exports.createVenue = async (req, res) => {
  try {
    const { name, organizationId } = req.body;

    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    // Verify ownership
    const org = await Organization.findOne({ _id: organizationId, ownerId: req.user._id });
    if (!org) {
      return res.status(403).json({ message: "You do not own this organization" });
    }

    const venue = await Venue.create({ name, organizationId });
    res.json(venue);
  } catch (err) {
    console.error("Error creating venue:", err);
    res.status(500).json({ message: "Error creating venue" });
  }
};

module.exports.getVenues = async (req, res) => {
  try {
    const { organizationId } = req.query;

    if (!organizationId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    // Verify access (owner or member)
    // For now, assuming owner access check is sufficient or if user belongs to org
    if (req.user.role === 'owner') {
      const org = await Organization.findOne({ _id: organizationId, ownerId: req.user._id });
      if (!org) {
        return res.status(403).json({ message: "Access denied" });
      }
    } else {
      if (req.user.organizationId.toString() !== organizationId) {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    const venues = await Venue.find({ organizationId });
    res.json(venues);
  } catch (err) {
    console.error("Error fetching venues:", err);
    res.status(500).json({ message: "Error fetching venues" });
  }
};
