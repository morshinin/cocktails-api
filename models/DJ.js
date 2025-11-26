const mongoose = require('mongoose');

const djSchema = new mongoose.Schema({
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
    genre: {
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
    socialLinks: {
        instagram: String,
        soundcloud: String,
        telegram: String
    },
    contacts: {
        phone: String,
        email: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DJ', djSchema);
