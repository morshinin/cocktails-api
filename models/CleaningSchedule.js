const mongoose = require('mongoose');

const cleaningTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    zoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone'
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    completedAt: Date
});

const cleaningScheduleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    tasks: [cleaningTaskSchema],
    notes: String
}, {
    timestamps: true
});

// Ensure unique schedule per venue per day
cleaningScheduleSchema.index({ date: 1, venueId: 1 }, { unique: true });

module.exports = mongoose.model('CleaningSchedule', cleaningScheduleSchema);
