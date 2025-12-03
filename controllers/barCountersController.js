const BarCounter = require('../models/BarCounter');

// Get all bar counters for venue
exports.getBarCounters = async (req, res) => {
    try {
        const { venueId } = req.query;

        if (!venueId) {
            return res.status(400).json({ message: 'venueId is required' });
        }

        const counters = await BarCounter.find({ venueId }).sort({ createdAt: -1 });
        res.json(counters);
    } catch (err) {
        console.error('Error fetching bar counters:', err);
        res.status(500).json({ message: err.message });
    }
};

// Get single bar counter by ID
exports.getBarCounterById = async (req, res) => {
    try {
        const counter = await BarCounter.findById(req.params.id);

        if (!counter) {
            return res.status(404).json({ message: 'Bar counter not found' });
        }

        res.json(counter);
    } catch (err) {
        console.error('Error fetching bar counter:', err);
        res.status(500).json({ message: err.message });
    }
};

// Create new bar counter
exports.createBarCounter = async (req, res) => {
    try {
        const { name, description, location, imageUrl, capacity, status, venueId, organizationId } = req.body;

        if (!name || !venueId || !organizationId) {
            return res.status(400).json({ message: 'Name, venueId, and organizationId are required' });
        }

        const counter = new BarCounter({
            name,
            description,
            location,
            imageUrl,
            capacity,
            status: status || 'Active',
            venueId,
            organizationId
        });

        const newCounter = await counter.save();
        res.status(201).json(newCounter);
    } catch (err) {
        console.error('Error creating bar counter:', err);
        res.status(400).json({ message: err.message });
    }
};

// Update bar counter
exports.updateBarCounter = async (req, res) => {
    try {
        const { name, description, location, imageUrl, capacity, status } = req.body;

        const counter = await BarCounter.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                location,
                imageUrl,
                capacity,
                status
            },
            { new: true, runValidators: true }
        );

        if (!counter) {
            return res.status(404).json({ message: 'Bar counter not found' });
        }

        res.json(counter);
    } catch (err) {
        console.error('Error updating bar counter:', err);
        res.status(400).json({ message: err.message });
    }
};

// Delete bar counter
exports.deleteBarCounter = async (req, res) => {
    try {
        const counter = await BarCounter.findByIdAndDelete(req.params.id);

        if (!counter) {
            return res.status(404).json({ message: 'Bar counter not found' });
        }

        res.json({ message: 'Bar counter deleted successfully' });
    } catch (err) {
        console.error('Error deleting bar counter:', err);
        res.status(500).json({ message: err.message });
    }
};
