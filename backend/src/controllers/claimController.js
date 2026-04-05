const Claim = require('../models/Claim');
const Policy = require('../models/Policy');
const Transaction = require('../models/Transaction');
const { processPayout } = require('../services/claimService');

// Get all claims for user
exports.getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.userId }).populate('policyId');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claims', error: error.message });
  }
};

// Get claim details
exports.getClaimDetails = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);
    
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claim', error: error.message });
  }
};

// Get claim status
exports.getClaimStatus = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);
    
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    res.json({
      id: claim._id,
      status: claim.status,
      triggerType: claim.triggerType,
      payoutAmount: claim.payoutAmount,
      transactionId: claim.transactionId,
      createdAt: claim.createdAt,
      paidAt: claim.paidAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching claim status', error: error.message });
  }
};

// Get recent transactions
exports.getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get earnings summary
exports.getEarningsSummary = async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.userId, status: 'paid' });
    const totalPayouts = claims.reduce((sum, claim) => sum + claim.payoutAmount, 0);
    const premiumsPaid = await Transaction.find({
      userId: req.userId,
      type: 'premium_payment',
      status: 'completed'
    });
    const totalPremiums = premiumsPaid.reduce((sum, txn) => sum + txn.amount, 0);

    res.json({
      totalPayouts,
      totalPremiums,
      netBenefit: totalPayouts - totalPremiums,
      claimsCount: claims.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching earnings summary', error: error.message });
  }
};
