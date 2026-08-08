const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
    {
        monasteryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monastery',
            required: true,
            index: true,
        },
        activities: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
