const Policy = require('../models/Policy');
const User = require('../models/User');
const Claim = require('../models/Claim');
const { createPolicy, createPayment } = require('../services/paymentService');

// Get all policies for user
exports.getUserPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ userId: req.userId });
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching policies', error: error.message });
  }
};

// Create new policy
exports.createPolicy = async (req, res) => {
  try {
    const { planId } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const policy = await createPolicy(req.userId, planId, user.riskScore);

    // Create payment transaction
    await createPayment(req.userId, policy.weeklyPremium, policy._id);

    // Update user's active policy
    user.activePolicy = policy._id;
    await user.save();

    res.status(201).json({
      message: 'Policy created successfully',
      policy,
      premium: policy.weeklyPremium
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating policy', error: error.message });
  }
};

// Get policy details
exports.getPolicyDetails = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.policyId).populate('userId');
    
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching policy', error: error.message });
  }
};

// Get claims for policy
exports.getPolicyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ policyId: req.params.policyId });
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claims', error: error.message });
  }
};

// Get active policy
exports.getActivePolicy = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || !user.activePolicy) {
      return res.status(404).json({ message: 'No active policy' });
    }

    const policy = await Policy.findById(user.activePolicy);
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching active policy', error: error.message });
  }
};
