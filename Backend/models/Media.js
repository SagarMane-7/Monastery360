const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['image', 'video', 'panorama'],
            index: true,
        },
        originalUrl: {
            type: String,
            default: '',
        },
        gcsUrl: {
            type: String,
            default: '',
        },
        iiifManifestUrl: {
            type: String,
            default: '',
        },
        thumbnailUrl: {
            type: String,
            default: '',
        },
        metadata: {
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
            format: { type: String, default: '' },
            size: { type: Number, default: 0 },
            duration: { type: Number, default: 0 },
        },
        tags: {
            type: [String],
            default: [],
        },
        relatedMonastery: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Monastery',
            default: null,
        },
        relatedFestival: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Festival',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

mediaSchema.index({ tags: 1 });
mediaSchema.index({ title: 'text', tags: 'text' });

module.exports = mongoose.model('Media', mediaSchema);
