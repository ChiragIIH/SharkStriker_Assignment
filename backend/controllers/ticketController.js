const Ticket = require('../models/ticketModel');

// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Tickets (with optional filters)
exports.getTickets = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.department) query.department = req.query.department;
    if (req.query.priority) query.priority = req.query.priority;
    // Only show tickets created by the customer if role is customer
    if (req.user.role === 'customer') {
      query.createdBy = req.user._id;
    }
    const tickets = await Ticket.find(query)
      .populate('department', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Ticket
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('department', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Ticket
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 