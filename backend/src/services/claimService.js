const User = require('../models/User');
const Policy = require('../models/Policy');
const Claim = require('../models/Claim');
const Transaction = require('../models/Transaction');

// Mock weather API service
const getWeatherData = async (latitude, longitude) => {
  // Mock weather data - in production, integrate with OpenWeatherMap
  const mockWeatherData = {
    temperature: 38 + Math.random() * 8, // 38-46°C
    rainfall: Math.random() * 100, // 0-100mm
    humidity: 60 + Math.random() * 30,
    condition: ['clear', 'rainy', 'stormy'][Math.floor(Math.random() * 3)]
  };
  return mockWeatherData;
};

// Check for disruptions and trigger claims
const checkAndTriggerClaims = async () => {
  try {
    const activePolicies = await Policy.find({ status: 'active' }).populate('userId');

    for (const policy of activePolicies) {
      const user = policy.userId;
      if (!user || !user.location) continue;

      const weather = await getWeatherData(user.location.latitude, user.location.longitude);
      const triggers = [];

      // Check rainfall trigger (>50mm)
      if (weather.rainfall > policy.coverage.rainfall.threshold) {
        triggers.push({
          type: 'rainfall',
          value: weather.rainfall,
          payout: policy.coverage.rainfall.payout
        });
      }

      // Check heat trigger (>42°C)
      if (weather.temperature > policy.coverage.heat.threshold) {
        triggers.push({
          type: 'heat',
          value: weather.temperature,
          payout: policy.coverage.heat.payout
        });
      }

      // Process triggers
      for (const trigger of triggers) {
        const existingClaim = await Claim.findOne({
          userId: user._id,
          policyId: policy._id,
          triggerType: trigger.type,
          createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Within 24 hours
        });

        if (!existingClaim) {
          // Create new claim
          const claim = new Claim({
            userId: user._id,
            policyId: policy._id,
            triggerType: trigger.type,
            triggerValue: trigger.value,
            location: user.location,
            payoutAmount: trigger.payout,
            status: 'approved'
          });

          await claim.save();

          // Process payout
          await processPayout(claim, policy);
        }
      }
    }
  } catch (error) {
    console.error('Error checking claims:', error);
  }
};

const processPayout = async (claim, policy) => {
  try {
    // Create transaction
    const transaction = new Transaction({
      userId: claim.userId,
      type: 'payout',
      amount: claim.payoutAmount,
      description: `Payout for ${claim.triggerType} trigger`,
      status: 'completed',
      razorpayId: `mock_txn_${Date.now()}`,
      claimId: claim._id
    });

    await transaction.save();

    // Update claim status
    claim.status = 'paid';
    claim.transactionId = transaction._id;
    claim.paidAt = new Date();
    await claim.save();

    // Update policy
    policy.totalClaims += 1;
    policy.totalPayoutReceived += claim.payoutAmount;
    await policy.save();

    // Update user earnings
    const user = await User.findById(claim.userId);
    user.totalEarnings += claim.payoutAmount;
    await user.save();

    return transaction;
  } catch (error) {
    console.error('Error processing payout:', error);
  }
};

module.exports = {
  getWeatherData,
  checkAndTriggerClaims,
  processPayout
};
