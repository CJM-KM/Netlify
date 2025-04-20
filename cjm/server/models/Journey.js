const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  stages: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    touchpoints: [{
      name: String,
      description: String,
      channel: String,
      painPoints: [String],
      opportunities: [String]
    }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Journey', journeySchema); 