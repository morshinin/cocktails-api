const mongoose = require('mongoose');

const regularGuestSchema = new mongoose.Schema({
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    contacts: {
        phone: String,
        email: String,
        telegram: String
    },
    preferences: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String
    },
    birthday: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RegularGuest', regularGuestSchema);
