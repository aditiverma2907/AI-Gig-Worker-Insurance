const express = require('express');
const claimController = require('../controllers/claimController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', claimController.getUserClaims);
router.get('/transactions', claimController.getUserTransactions);
router.get('/summary/earnings', claimController.getEarningsSummary);
router.get('/:claimId', claimController.getClaimDetails);
router.get('/:claimId/status', claimController.getClaimStatus);

module.exports = router;
