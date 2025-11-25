const Reservation = require('../models/Reservation');

exports.getReservations = async (req, res) => {
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

        const reservations = await Reservation.find(query).sort({ date: 1, time: 1 });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createReservation = async (req, res) => {
    const reservation = new Reservation({
        ...req.body,
        venueId: req.user.venueId,
        createdBy: req.user._id
    });
    try {
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findOneAndUpdate(
            { _id: req.params.id, venueId: req.user.venueId },
            req.body,
            { new: true }
        );
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.json(reservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findOneAndDelete({ _id: req.params.id, venueId: req.user.venueId });
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
        res.json({ message: 'Reservation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
