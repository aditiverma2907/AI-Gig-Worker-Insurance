const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: true
  },
  triggerType: {
    type: String,
    enum: ['rainfall', 'flood', 'heat', 'curfew'],
    required: true
  },
  triggerValue: {
    type: Number,
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    city: String
  },
  payoutAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paid'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    sparse: true
  },
  fraudScore: {
    type: Number,
    default: 0
  },
  isFraudulent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  paidAt: Date
});

module.exports = mongoose.model('Claim', claimSchema);
