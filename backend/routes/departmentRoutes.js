const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Only admin or superadmin can manage departments
router.post('/', protect, authorize('admin', 'superadmin'), departmentController.createDepartment);
router.get('/', protect, departmentController.getDepartments);
router.get('/:id', protect, departmentController.getDepartment);
router.put('/:id', protect, authorize('admin', 'superadmin'), departmentController.updateDepartment);
router.delete('/:id', protect, authorize('admin', 'superadmin'), departmentController.deleteDepartment);
router.get('/admins/list', protect, authorize('admin', 'superadmin'), departmentController.getAdmins);

module.exports = router; 