const Organization = require("../models/Organization");

module.exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find({ ownerId: req.user._id });
        res.json(organizations);
    } catch (err) {
        console.error("Error fetching organizations:", err);
        res.status(500).json({ message: "Error fetching organizations" });
    }
};

module.exports.createOrganization = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const organization = await Organization.create({
            name,
            address,
            phone,
            email,
            ownerId: req.user._id,
        });

        res.status(201).json(organization);
    } catch (err) {
        console.error("Error creating organization:", err);
        res.status(500).json({ message: "Error creating organization" });
    }
};

module.exports.updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, email } = req.body;

        const organization = await Organization.findOne({ _id: id, ownerId: req.user._id });

        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        organization.name = name || organization.name;
        organization.address = address || organization.address;
        organization.phone = phone || organization.phone;
        organization.email = email || organization.email;

        await organization.save();

        res.json(organization);
    } catch (err) {
        console.error("Error updating organization:", err);
        res.status(500).json({ message: "Error updating organization" });
    }
};
