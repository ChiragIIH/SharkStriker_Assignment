const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  email: { type: String },
  assignedAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hidden: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema); 