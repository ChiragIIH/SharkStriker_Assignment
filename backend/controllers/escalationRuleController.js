const EscalationRule = require('../models/escalationRuleModel');

// Create Escalation Rule
exports.createRule = async (req, res) => {
  try {
    const rule = await EscalationRule.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(rule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Escalation Rules
exports.getRules = async (req, res) => {
  try {
    const rules = await EscalationRule.find().populate('createdBy', 'name email');
    res.json(rules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Rule
exports.getRule = async (req, res) => {
  try {
    const rule = await EscalationRule.findById(req.params.id).populate('createdBy', 'name email');
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    res.json(rule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Rule
exports.updateRule = async (req, res) => {
  try {
    const rule = await EscalationRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    res.json(rule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Rule
exports.deleteRule = async (req, res) => {
  try {
    const rule = await EscalationRule.findByIdAndDelete(req.params.id);
    if (!rule) return res.status(404).json({ message: 'Rule not found' });
    res.json({ message: 'Rule deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 