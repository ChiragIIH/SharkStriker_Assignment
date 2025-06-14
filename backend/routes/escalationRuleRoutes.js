const express = require('express');
const router = express.Router();
const escalationRuleController = require('../controllers/escalationRuleController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Only superadmin can manage escalation rules
router.post('/', protect, authorize('superadmin'), escalationRuleController.createRule);
router.get('/', protect, authorize('superadmin'), escalationRuleController.getRules);
router.get('/:id', protect, authorize('superadmin'), escalationRuleController.getRule);
router.put('/:id', protect, authorize('superadmin'), escalationRuleController.updateRule);
router.delete('/:id', protect, authorize('superadmin'), escalationRuleController.deleteRule);

module.exports = router; 