const mongoose = require('mongoose');

const hotspotSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        position: {
            type: String,
            required: true,
            default: '0 1.6 -3',
        },
        targetScene: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
    },
    { _id: true }
);

const sceneSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        type: {
            type: String,
            enum: ['360', 'standard'],
            default: '360',
        },
        monasteryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monastery',
            required: true,
            index: true,
        },
        panoramaUrl: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        hotspots: {
            type: [hotspotSchema],
            default: [],
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

sceneSchema.index({ monasteryId: 1, order: 1 });

module.exports = mongoose.model('Scene', sceneSchema);
