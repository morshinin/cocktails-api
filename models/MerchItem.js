const mongoose = require('mongoose');

const merchItemSchema = new mongoose.Schema({
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
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    imageUrl: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MerchItem', merchItemSchema);
