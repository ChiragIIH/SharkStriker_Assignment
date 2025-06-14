import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material';
import { Add, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../redux/slices/ticketSlice';
import { fetchDepartments } from '../redux/slices/departmentSlice';
import { useNavigate } from 'react-router-dom';

const priorities = ['Low', 'Medium', 'High', 'Critical'];
const statuses = ['Open', 'In Progress', 'Escalated', 'Merged', 'Closed'];

const Tickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: tickets, loading } = useSelector((state) => state.tickets);
  const { items: departments } = useSelector((state) => state.departments);
  const [filters, setFilters] = useState({ status: '', department: '', priority: '' });

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTickets(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <Typography variant="h5">Tickets</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/tickets/new')}>
          Create Ticket
        </Button>
      </Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select name="status" value={filters.status} label="Status" onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select name="priority" value={filters.priority} label="Priority" onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            {priorities.map((p) => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Department</InputLabel>
          <Select name="department" value={filters.department} label="Department" onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            {departments.map((d) => (
              <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell><Chip label={ticket.status} size="small" /></TableCell>
                <TableCell><Chip label={ticket.priority} size="small" color={
                  ticket.priority === 'Critical' ? 'error' : ticket.priority === 'High' ? 'warning' : ticket.priority === 'Medium' ? 'info' : 'default'
                } /></TableCell>
                <TableCell>{ticket.department?.name}</TableCell>
                <TableCell>{ticket.assignedTo?.name || '-'}</TableCell>
                <TableCell>{ticket.createdBy?.name || '-'}</TableCell>
                <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View"><IconButton onClick={() => navigate(`/tickets/${ticket._id}`)}><Visibility /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {tickets.length === 0 && !loading && (
              <TableRow><TableCell colSpan={8} align="center">No tickets found.</TableCell></TableRow>
            )}
            {loading && (
              <TableRow><TableCell colSpan={8} align="center"><CircularProgress size={24} /></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tickets; 