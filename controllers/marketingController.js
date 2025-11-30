const RegularGuest = require('../models/RegularGuest');
const MerchItem = require('../models/MerchItem');

// --- Regular Guests ---
exports.getGuests = async (req, res) => {
    try {
        const { venueId } = req.query;
        if (!venueId) {
            return res.status(400).json({ message: 'venueId is required' });
        }
        const guests = await RegularGuest.find({ venueId });
        res.json(guests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createGuest = async (req, res) => {
    const guest = new RegularGuest({
        name: req.body.name,
        contacts: req.body.contacts,
        preferences: req.body.preferences,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        birthday: req.body.birthday,
        venueId: req.body.venueId
    });
    try {
        const newGuest = await guest.save();
        res.status(201).json(newGuest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateGuest = async (req, res) => {
    try {
        const guest = await RegularGuest.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                contacts: req.body.contacts,
                preferences: req.body.preferences,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                birthday: req.body.birthday
            },
            { new: true }
        );
        if (!guest) return res.status(404).json({ message: 'Guest not found' });
        res.json(guest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteGuest = async (req, res) => {
    try {
        const guest = await RegularGuest.findByIdAndDelete(req.params.id);
        if (!guest) return res.status(404).json({ message: 'Guest not found' });
        res.json({ message: 'Guest deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Merch Items ---
exports.getMerch = async (req, res) => {
    try {
        const merch = await MerchItem.find({ venueId: req.user.venueId });
        res.json(merch);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMerch = async (req, res) => {
    const merch = new MerchItem({
        ...req.body,
        venueId: req.user.venueId
    });
    try {
        const newMerch = await merch.save();
        res.status(201).json(newMerch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateMerch = async (req, res) => {
    try {
        const merch = await MerchItem.findOneAndUpdate(
            { _id: req.params.id, venueId: req.user.venueId },
            req.body,
            { new: true }
        );
        if (!merch) return res.status(404).json({ message: 'Merch item not found' });
        res.json(merch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteMerch = async (req, res) => {
    try {
        const merch = await MerchItem.findOneAndDelete({ _id: req.params.id, venueId: req.user.venueId });
        if (!merch) return res.status(404).json({ message: 'Merch item not found' });
        res.json({ message: 'Merch item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
