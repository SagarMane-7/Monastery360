const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            default: '',
        },
        image: {
            type: [String],
            default: [],
        },
        history_origins: {
            type: String,
            default: '',
        },
        rituals_practices: {
            type: [String],
            default: [],
        },
        cultural_significance: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

festivalSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Festival', festivalSchema);
