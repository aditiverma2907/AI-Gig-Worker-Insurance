const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['premium_payment', 'payout', 'refund'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  razorpayId: String,
  claimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claim',
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
