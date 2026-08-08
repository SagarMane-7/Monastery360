const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        festivalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Festival',
            default: null,
        },
        monasteryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monastery',
            default: null,
        },
        startDate: {
            type: Date,
            required: true,
            index: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        location: {
            type: String,
            default: '',
        },
        isRecurring: {
            type: Boolean,
            default: false,
        },
        recurrencePattern: {
            type: String,
            enum: ['yearly', 'monthly', 'custom', ''],
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Event', eventSchema);
