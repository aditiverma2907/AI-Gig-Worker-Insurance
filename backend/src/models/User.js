const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  aadhar: {
    type: String,
    unique: true,
    sparse: true
  },
  bankAccount: {
    type: String,
    sparse: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    city: String,
    state: String
  },
  riskScore: {
    type: Number,
    default: 50
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  activePolicy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    default: null
  },
  verificationStatus: {
    type: String,
    enum: ['unverified', 'verified', 'rejected'],
    default: 'unverified'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
