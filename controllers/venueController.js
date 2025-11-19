const Venue = require("../models/Venue");

module.exports.createVenue = async (req, res) => {
  try {
    const { name } = req.body;
    const organizationId = req.user.organizationId;

    if (!organizationId)
      return res.status(403).json({ message: "User is not in an organization" });

    const venue = await Venue.create({ name, organizationId });
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: "Error creating venue" });
  }
};

module.exports.getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ organizationId: req.user.organizationId });
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: "Error fetching venues" });
  }
};
