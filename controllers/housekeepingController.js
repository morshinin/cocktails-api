const Zone = require('../models/Zone');
const Equipment = require('../models/Equipment');
const LostItem = require('../models/LostItem');
const CleaningSchedule = require('../models/CleaningSchedule');

// --- Zones ---
exports.getZones = async (req, res) => {
    try {
        const zones = await Zone.find({ venueId: req.user.venueId });
        res.json(zones);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createZone = async (req, res) => {
    const zone = new Zone({
        ...req.body,
        venueId: req.user.venueId
    });
    try {
        const newZone = await zone.save();
        res.status(201).json(newZone);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateZone = async (req, res) => {
    try {
        const zone = await Zone.findOneAndUpdate(
            { _id: req.params.id, venueId: req.user.venueId },
            req.body,
            { new: true }
        );
        if (!zone) return res.status(404).json({ message: 'Zone not found' });
        res.json(zone);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteZone = async (req, res) => {
    try {
        const zone = await Zone.findOneAndDelete({ _id: req.params.id, venueId: req.user.venueId });
        if (!zone) return res.status(404).json({ message: 'Zone not found' });
        res.json({ message: 'Zone deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Equipment ---
exports.getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find({ venueId: req.user.venueId }).populate('zoneId');
        res.json(equipment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEquipment = async (req, res) => {
    const equipment = new Equipment({
        ...req.body,
        venueId: req.user.venueId
    });
    try {
        const newEquipment = await equipment.save();
        res.status(201).json(newEquipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findOneAndUpdate(
            { _id: req.params.id, venueId: req.user.venueId },
            req.body,
            { new: true }
        );
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        res.json(equipment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findOneAndDelete({ _id: req.params.id, venueId: req.user.venueId });
        if (!equipment) return res.status(404).json({ message: 'Equipment not found' });
        res.json({ message: 'Equipment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Lost Items ---
exports.getLostItems = async (req, res) => {
    try {
        const items = await LostItem.find({ venueId: req.user.venueId }).sort({ dateFound: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLostItem = async (req, res) => {
    const item = new LostItem({
        ...req.body,
        venueId: req.user.venueId
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateLostItem = async (req, res) => {
    try {
        const item = await LostItem.findOneAndUpdate(
            { _id: req.params.id, venueId: req.user.venueId },
            req.body,
            { new: true }
        );
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteLostItem = async (req, res) => {
    try {
        const item = await LostItem.findOneAndDelete({ _id: req.params.id, venueId: req.user.venueId });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- Cleaning Schedule ---
exports.getSchedule = async (req, res) => {
    try {
        const { date } = req.query;
        let query = { venueId: req.user.venueId };

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const schedule = await CleaningSchedule.findOne(query).populate('tasks.zoneId').populate('tasks.completedBy');
        res.json(schedule || { tasks: [] }); // Return empty tasks if no schedule exists yet
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createOrUpdateSchedule = async (req, res) => {
    try {
        const { date, tasks, notes } = req.body;
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        let schedule = await CleaningSchedule.findOne({
            venueId: req.user.venueId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (schedule) {
            // Update existing
            schedule.tasks = tasks;
            schedule.notes = notes;
            await schedule.save();
        } else {
            // Create new
            schedule = new CleaningSchedule({
                venueId: req.user.venueId,
                date: startOfDay,
                tasks,
                notes
            });
            await schedule.save();
        }

        // Re-fetch to populate
        const updatedSchedule = await CleaningSchedule.findById(schedule._id)
            .populate('tasks.zoneId')
            .populate('tasks.completedBy');

        res.json(updatedSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
