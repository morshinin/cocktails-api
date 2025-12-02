const Event = require('../models/Event');

// Get events by date
module.exports.getEventsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const venueId = req.user.selectedVenue;

        if (!venueId) {
            return res.status(400).json({ message: 'No venue selected' });
        }

        if (!date) {
            return res.status(400).json({ message: 'Date parameter is required' });
        }

        // Parse date and get start/end of day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const events = await Event.find({
            venueId,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })
            .populate('djId', 'name')
            .sort({ startTime: 1 });

        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Error fetching events' });
    }
};

// Create event
module.exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, startTime, endTime, djId, imageUrl, status } = req.body;
        const venueId = req.user.selectedVenue;
        const organizationId = req.user.organizationId;

        if (!venueId) {
            return res.status(400).json({ message: 'No venue selected' });
        }

        if (!title || !date || !startTime) {
            return res.status(400).json({ message: 'Title, date, and start time are required' });
        }

        const event = await Event.create({
            title,
            description,
            date,
            startTime,
            endTime,
            djId: djId || undefined,
            imageUrl,
            status: status || 'Scheduled',
            venueId,
            organizationId
        });

        const populatedEvent = await Event.findById(event._id).populate('djId', 'name');
        res.status(201).json(populatedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Error creating event' });
    }
};

// Update event
module.exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, startTime, endTime, djId, imageUrl, status } = req.body;
        const venueId = req.user.selectedVenue;

        if (!venueId) {
            return res.status(400).json({ message: 'No venue selected' });
        }

        // Find event and verify ownership
        const event = await Event.findOne({ _id: id, venueId });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or access denied' });
        }

        // Update fields
        event.title = title || event.title;
        event.description = description !== undefined ? description : event.description;
        event.date = date || event.date;
        event.startTime = startTime || event.startTime;
        event.endTime = endTime !== undefined ? endTime : event.endTime;
        event.djId = djId !== undefined ? djId : event.djId;
        event.imageUrl = imageUrl !== undefined ? imageUrl : event.imageUrl;
        event.status = status || event.status;

        await event.save();

        const populatedEvent = await Event.findById(event._id).populate('djId', 'name');
        res.json(populatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Error updating event' });
    }
};

// Delete event
module.exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const venueId = req.user.selectedVenue;

        if (!venueId) {
            return res.status(400).json({ message: 'No venue selected' });
        }

        const event = await Event.findOneAndDelete({ _id: id, venueId });

        if (!event) {
            return res.status(404).json({ message: 'Event not found or access denied' });
        }

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Error deleting event' });
    }
};
