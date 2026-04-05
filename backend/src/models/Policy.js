const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planId: {
    type: String,
    enum: ['basic', 'pro', 'premium'],
    required: true
  },
  weeklyPremium: {
    type: Number,
    required: true
  },
  coverage: {
    rainfall: {
      threshold: { type: Number, default: 50 },
      payout: { type: Number, default: 300 }
    },
    flood: {
      threshold: { type: Number, default: 1 },
      payout: { type: Number, default: 500 }
    },
    heat: {
      threshold: { type: Number, default: 42 },
      payout: { type: Number, default: 200 }
    },
    curfew: {
      threshold: { type: Number, default: 1 },
      payout: { type: Number, default: 400 }
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired', 'claimed'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  totalClaims: {
    type: Number,
    default: 0
  },
  totalPayoutReceived: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'bank_transfer'],
    default: 'razorpay'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Policy', policySchema);
