const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    zoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone'
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    status: {
        type: String,
        enum: ['Working', 'Broken', 'Maintenance'],
        default: 'Working'
    },
    purchaseDate: {
        type: Date
    },
    price: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Equipment', equipmentSchema);
