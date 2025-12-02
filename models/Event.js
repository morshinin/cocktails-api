const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, // HH:mm
        required: true
    },
    endTime: {
        type: String // HH:mm
    },
    djId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DJ'
    },
    imageUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Cancelled', 'Completed'],
        default: 'Scheduled'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
