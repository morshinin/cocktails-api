const mongoose = require('mongoose');

const barCounterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String
    },
    capacity: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Maintenance'],
        default: 'Active'
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, {
    timestamps: true
});

// Index for efficient queries
barCounterSchema.index({ venueId: 1 });

module.exports = mongoose.model('BarCounter', barCounterSchema);
