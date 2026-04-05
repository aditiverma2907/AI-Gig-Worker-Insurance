const Policy = require('../models/Policy');
const Transaction = require('../models/Transaction');

// Calculate premium based on risk score and plan type
const calculatePremium = (riskScore, planType) => {
  const basePremium = {
    basic: 100,
    pro: 150,
    premium: 200
  };

  const riskMultiplier = 1 + (riskScore / 1000);
  return Math.round(basePremium[planType] * riskMultiplier);
};

// Create a new policy
const createPolicy = async (userId, planId, riskScore) => {
  try {
    const weeklyPremium = calculatePremium(riskScore, planId);
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const policy = new Policy({
      userId,
      planId,
      weeklyPremium,
      endDate,
      coverage: {
        rainfall: { threshold: 50, payout: 300 },
        flood: { threshold: 1, payout: 500 },
        heat: { threshold: 42, payout: 200 },
        curfew: { threshold: 1, payout: 400 }
      }
    });

    await policy.save();
    return policy;
  } catch (error) {
    throw new Error(`Failed to create policy: ${error.message}`);
  }
};

// Create payment transaction
const createPayment = async (userId, amount, policyId) => {
  try {
    // Mock Razorpay transaction
    const transaction = new Transaction({
      userId,
      type: 'premium_payment',
      amount,
      description: `Weekly premium payment for policy`,
      status: 'completed',
      razorpayId: `mock_payment_${Date.now()}`
    });

    await transaction.save();
    return transaction;
  } catch (error) {
    throw new Error(`Failed to create payment: ${error.message}`);
  }
};

module.exports = {
  calculatePremium,
  createPolicy,
  createPayment
};
