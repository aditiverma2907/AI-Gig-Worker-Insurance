const express = require('express');
const policyController = require('../controllers/policyController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', policyController.getUserPolicies);
router.post('/', policyController.createPolicy);
router.get('/active', policyController.getActivePolicy);
router.get('/:policyId', policyController.getPolicyDetails);
router.get('/:policyId/claims', policyController.getPolicyClaims);

module.exports = router;
