import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
  Divider,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, updateTicket } from '../redux/slices/ticketSlice';
import { fetchDepartments } from '../redux/slices/departmentSlice';
import { useParams, useNavigate } from 'react-router-dom';

const statuses = ['Open', 'In Progress', 'Escalated', 'Merged', 'Closed'];

const TicketDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: tickets, loading } = useSelector((state) => state.tickets);
  const { items: departments } = useSelector((state) => state.departments);
  const { user } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ status: '', assignedTo: '' });

  useEffect(() => {
    if (tickets.length === 0) dispatch(fetchTickets());
    if (departments.length === 0) dispatch(fetchDepartments());
  }, [dispatch, tickets.length, departments.length]);

  const ticket = tickets.find((t) => t._id === id);

  useEffect(() => {
    if (ticket) setForm({ status: ticket.status, assignedTo: ticket.assignedTo?._id || '' });
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    await dispatch(updateTicket({ id, data: form }));
    setEdit(false);
  };

  if (!ticket) return loading ? <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box> : <Typography>Ticket not found.</Typography>;

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>{ticket.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Created by {ticket.createdBy?.name || '-'} on {new Date(ticket.createdAt).toLocaleString()}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Chip label={ticket.status} color="primary" />
          <Chip label={ticket.priority} color={
            ticket.priority === 'Critical' ? 'error' : ticket.priority === 'High' ? 'warning' : ticket.priority === 'Medium' ? 'info' : 'default'
          } />
          <Chip label={ticket.department?.name} />
        </Stack>
        <Typography variant="subtitle1" gutterBottom>Description</Typography>
        <Typography sx={{ mb: 2 }}>{ticket.description}</Typography>
        <Typography variant="subtitle1" gutterBottom>Tags</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          {ticket.tags.map((tag) => <Chip key={tag} label={tag} />)}
          {ticket.tags.length === 0 && <Typography color="text.secondary">No tags</Typography>}
        </Stack>
        <Typography variant="subtitle1" gutterBottom>Assigned To</Typography>
        <Typography sx={{ mb: 2 }}>{ticket.assignedTo?.name || '-'}</Typography>
        {edit ? (
          <Stack spacing={2} sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={form.status} label="Status" onChange={handleChange}>
                {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
            {/* Assignment logic: only admins/superadmins can assign */}
            {(user?.role === 'admin' || user?.role === 'superadmin') && (
              <FormControl fullWidth>
                <InputLabel>Assign To (User ID)</InputLabel>
                <Select name="assignedTo" value={form.assignedTo} label="Assign To" onChange={handleChange}>
                  {/* In a real app, you would fetch and list users/agents here */}
                  <MenuItem value="">Unassigned</MenuItem>
                </Select>
              </FormControl>
            )}
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleUpdate}>Save</Button>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
            </Stack>
          </Stack>
        ) : (
          <Button variant="outlined" onClick={() => setEdit(true)} sx={{ mb: 2 }}>Edit Status / Assignment</Button>
        )}
        <Button onClick={() => navigate('/tickets')}>Back to Tickets</Button>
      </Paper>
    </Box>
  );
};

export default TicketDetails; 