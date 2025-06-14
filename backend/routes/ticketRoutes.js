const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All users can create tickets, but only admin/superadmin can assign or delete
router.post('/', protect, ticketController.createTicket);
router.get('/', protect, ticketController.getTickets);
router.get('/:id', protect, ticketController.getTicket);
router.put('/:id', protect, ticketController.updateTicket);
router.delete('/:id', protect, authorize('admin', 'superadmin'), ticketController.deleteTicket);

module.exports = router; 