const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
  field: { type: String, required: true }, // e.g., 'priority', 'status', 'department', 'time_elapsed'
  operator: { type: String, required: true }, // e.g., 'equals', 'not_equals', 'greater_than', 'less_than'
  value: { type: mongoose.Schema.Types.Mixed, required: true },
}, { _id: false });

const actionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'assign_department', 'change_status', 'update_priority', 'escalate_to', 'add_reply'
  value: { type: mongoose.Schema.Types.Mixed },
  message: { type: String }, // for add_reply
}, { _id: false });

const escalationRuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  conditions: [conditionSchema],
  actions: [actionSchema],
  logic: { type: String, enum: ['AND', 'OR'], default: 'AND' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('EscalationRule', escalationRuleSchema); 