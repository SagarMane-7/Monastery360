const mongoose = require('mongoose');

const monasterySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    image: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    history: {
      type: String,
      default: '',
    },
    architecture: {
      type: String,
      default: '',
    },
    spiritualSignificance: {
      type: String,
      default: '',
    },
    quickFacts: {
      established: { type: String, default: '' },
      sect: { type: String, default: '' },
      monks: { type: Number, default: 0 },
      altitude: { type: String, default: '' },
    },
    visitorInfo: {
      hours: { type: String, default: '' },
      fees: { type: String, default: '' },
      itinerary: { type: String, default: '' },
      booking: { type: String, default: '' },
    },
    festivals: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

monasterySchema.index({ name: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Monastery', monasterySchema);
