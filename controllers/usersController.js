const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all users for the organization
exports.getUsers = async (req, res) => {
    try {
        const { organizationId } = req.query;

        // Build filter
        const filter = {};
        if (organizationId) {
            filter.organizationId = organizationId;
        }

        const users = await User.find(filter).select("-passwordHash");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user (by Owner/Manager)
exports.createUser = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        user = new User({
            email,
            passwordHash,
            role: role || "guest",
            organizationId: req.user.organizationId,
        });

        await user.save();

        // If there's a Profile model, we should create it too, but currently User model seems to hold basic info.
        // Wait, the User model in the file view didn't have 'name'. 
        // Let's check if there is a Profile model or if name is on User.
        // The previous view_file of User.js showed: email, passwordHash, role, organizationId, invitedBy.
        // It did NOT show 'name'.
        // However, authController.registerOwner likely creates a Profile or adds name to User?
        // Let's check authController later. For now, I'll assume we might need to handle name separately or update User model.
        // Re-checking User model... it definitely didn't have name.
        // I'll stick to what's in User model for now.

        res.status(201).json({ message: "User created", user: { _id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user (role)
exports.updateUser = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select("-passwordHash");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
