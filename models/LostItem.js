const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    status: {
        type: String,
        enum: ['Waiting', 'Returned'],
        default: 'Waiting'
    },
    dateFound: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String
    },
    finderName: {
        type: String
    },
    ownerContact: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LostItem', lostItemSchema);
