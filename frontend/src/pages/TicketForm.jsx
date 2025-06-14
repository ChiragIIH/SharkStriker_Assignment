import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, updateTicket, fetchTickets } from '../redux/slices/ticketSlice';
import { fetchDepartments } from '../redux/slices/departmentSlice';
import { useNavigate, useParams } from 'react-router-dom';

const priorities = ['Low', 'Medium', 'High', 'Critical'];
const statuses = ['Open', 'In Progress', 'Escalated', 'Merged', 'Closed'];

const TicketForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items: departments } = useSelector((state) => state.departments);
  const { items: tickets, loading } = useSelector((state) => state.tickets);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
    department: '',
    tags: [],
    status: 'Open',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    dispatch(fetchDepartments());
    if (id && tickets.length === 0) {
      dispatch(fetchTickets());
    }
  }, [dispatch, id, tickets.length]);

  useEffect(() => {
    if (id && tickets.length > 0) {
      const ticket = tickets.find((t) => t._id === id);
      if (ticket) setForm({ ...ticket, department: ticket.department?._id || '' });
    }
  }, [id, tickets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = () => {
    if (tagInput && !form.tags.includes(tagInput)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput('');
    }
  };
  const handleTagDelete = (tag) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await dispatch(updateTicket({ id, data: form }));
    } else {
      await dispatch(createTicket(form));
    }
    navigate('/tickets');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
      <Typography variant="h5" gutterBottom>{id ? 'Edit' : 'Create'} Ticket</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} required fullWidth />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} required fullWidth multiline rows={4} />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={form.priority} label="Priority" onChange={handleChange}>
              {priorities.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Department</InputLabel>
            <Select name="department" value={form.department} label="Department" onChange={handleChange} required>
              {departments.map((d) => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)}
            </Select>
          </FormControl>
          <Box>
            <TextField
              label="Add Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleTagAdd(); } }}
              size="small"
              sx={{ width: 200, mr: 1 }}
            />
            <Button onClick={handleTagAdd} size="small" variant="outlined">Add</Button>
            <Box sx={{ mt: 1 }}>
              {form.tags.map((tag) => (
                <Chip key={tag} label={tag} onDelete={() => handleTagDelete(tag)} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </Box>
          {id && (
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={form.status} label="Status" onChange={handleChange}>
                {statuses.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          )}
          <Box>
            <Button type="submit" variant="contained" disabled={loading}>{id ? 'Update' : 'Create'} Ticket</Button>
            <Button onClick={() => navigate('/tickets')} sx={{ ml: 2 }}>Cancel</Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default TicketForm; 