const DJ = require('../models/DJ');
const Event = require('../models/Event');

// --- DJs ---
exports.getDJs = async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) {
            return res.status(400).json({ message: 'venueId is required' });
        }
        const djs = await DJ.find({ venueId });
        res.json(djs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDJ = async (req, res) => {
    const dj = new DJ({
        name: req.body.name,
        genre: req.body.genre,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        socialLinks: req.body.socialLinks,
        contacts: req.body.contacts,
        venueId: req.body.venueId
    });
    try {
        const newDJ = await dj.save();
        res.status(201).json(newDJ);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateDJ = async (req, res) => {
    try {
        const dj = await DJ.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                genre: req.body.genre,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                socialLinks: req.body.socialLinks,
                contacts: req.body.contacts
            },
            { new: true }
        );
        if (!dj) return res.status(404).json({ message: 'DJ not found' });
        res.json(dj);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteDJ = async (req, res) => {
    try {
        const dj = await DJ.findByIdAndDelete(req.params.id);
        if (!dj) return res.status(404).json({ message: 'DJ not found' });
        res.json({ message: 'DJ deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Events ---
exports.getEvents = async (req, res) => {
    try {
        const { date, month, year } = req.query;
        let query = { venueId: req.user.venueId };

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.date = { $gte: startOfDay, $lte: endOfDay };
        } else if (month && year) {
            const startOfMonth = new Date(year, month - 1, 1);
            const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
            query.date = { $gte: startOfMonth, $lte: endOfMonth };
        }

        const events = await Event.find(query).populate('djId').sort({ date: 1, startTime: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEvent = async (req, res) => {
    const event = new Event({
        ...req.body,
        venueId: req.user.venueId
    });
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate(
            { _id: req.params.id, venueId: req.user.venueId },
            req.body,
            { new: true }
        );
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id, venueId: req.user.venueId });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
