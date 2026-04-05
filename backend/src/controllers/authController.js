const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('../config/config');

const isDatabaseConnected = () => mongoose.connection.readyState === 1;
const databaseUnavailableMessage = 'Database unavailable. Please start MongoDB and try again.';

// Register user
exports.register = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({ message: databaseUnavailableMessage });
    }

    const { name, email, phone, password, city, state } = req.body;

    // Check if user exists
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      location: {
        city,
        state,
        latitude: Math.random() * 180 - 90, // Mock coordinates
        longitude: Math.random() * 360 - 180
      }
    });

    await user.save();

    // Create JWT token
    const payload = {
      userId: user._id,
      email: user.email
    };

    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or phone already exists' });
    }

    res.status(500).json({ message: 'Unable to register user right now. Please try again.' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({ message: databaseUnavailableMessage });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      userId: user._id,
      email: user.email
    };

    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        riskScore: user.riskScore,
        totalEarnings: user.totalEarnings
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to login right now. Please try again.' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({ message: databaseUnavailableMessage });
    }

    const user = await User.findById(req.userId).populate('activePolicy');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      riskScore: user.riskScore,
      totalEarnings: user.totalEarnings,
      activePolicy: user.activePolicy
    });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch user right now. Please try again.' });
  }
};
