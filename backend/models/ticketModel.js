const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Low',
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Escalated', 'Merged', 'Closed'],
    default: 'Open',
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema); 