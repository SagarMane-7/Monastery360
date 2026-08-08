const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
    {
        monasteryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monastery',
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['Hotel', 'Trekking', 'Restaurant', 'Attraction'],
            index: true,
        },
        lat: {
            type: String,
            required: true,
        },
        lng: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Place', placeSchema);
