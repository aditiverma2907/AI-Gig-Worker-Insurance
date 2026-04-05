const mongoose = require('mongoose');

const riskProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    city: String,
    state: String
  },
  weatherHistory: {
    avgRainfall: Number,
    avgTemperature: Number,
    riskLevel: String
  },
  riskScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  riskCategory: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  claimHistory: {
    totalClaims: { type: Number, default: 0 },
    approvedClaims: { type: Number, default: 0 },
    fraudulent: { type: Number, default: 0 }
  },
  predictedRiskNextMonth: Number,
  modelVersion: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RiskProfile', riskProfileSchema);
