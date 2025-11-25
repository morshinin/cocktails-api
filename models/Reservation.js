const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    guestName: {
        type: String,
        required: true,
        trim: true
    },
    guestContact: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guestsCount: {
        type: Number,
        required: true,
        min: 1
    },
    tableNumber: {
        type: String
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Pending', 'Cancelled', 'Seated', 'Completed'],
        default: 'Confirmed'
    },
    notes: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
