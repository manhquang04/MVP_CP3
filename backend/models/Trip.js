const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: ''
  },
  vibe: {
    type: String,
    default: ''
  },
  itinerary: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  collaborators: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      role: {
        type: String,
        enum: ['viewer', 'editor'],
        default: 'viewer'
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
TripSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Trip', TripSchema);