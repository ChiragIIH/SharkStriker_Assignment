const Department = require('../models/departmentModel');
const User = require('../models/userModel');

// Create Department
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    const populated = await department.populate('assignedAdmins', 'name email');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('assignedAdmins', 'name email');
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Department
exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate('assignedAdmins', 'name email');
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Department
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignedAdmins', 'name email');
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json(department);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Department
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all admin users
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('_id name email');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 