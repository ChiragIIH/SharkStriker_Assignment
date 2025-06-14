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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  IconButton,
  Tooltip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  ListItemText,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../redux/slices/departmentSlice';
import { userAPI } from '../services/api';
import { useTheme } from '@mui/material/styles';

const DepartmentForm = ({ open, onClose, onSubmit, initial }) => {
  const [form, setForm] = useState(
    initial || { name: '', description: '', email: '', hidden: false, assignedAdmins: [] }
  );
  const [admins, setAdmins] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (initial) {
      setForm({
        ...initial,
        assignedAdmins: (initial.assignedAdmins || []).map(a => (typeof a === 'object' ? a._id : a)),
      });
    } else {
      setForm({ name: '', description: '', email: '', hidden: false, assignedAdmins: [] });
    }
    if (open) {
      userAPI.getAdmins().then(res => setAdmins(res.data));
    }
  }, [initial, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAdminsChange = (e) => {
    setForm((prev) => ({ ...prev, assignedAdmins: e.target.value }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
        {initial ? 'Edit Department' : 'Add Department'}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>General Info</Typography>
          <TextField label="Department Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }} />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={2} sx={{ mb: 2 }} />
          <TextField label="Email Address" name="email" value={form.email} onChange={handleChange} fullWidth helperText="For notifications and correspondence" sx={{ mb: 2 }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Admins</Typography>
          <FormControl fullWidth>
            <InputLabel>Assigned Admins</InputLabel>
            <Select
              multiple
              name="assignedAdmins"
              value={form.assignedAdmins}
              onChange={handleAdminsChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((id) => {
                    const admin = admins.find(a => a._id === id);
                    return admin ? <Chip key={id} label={admin.name} /> : null;
                  })}
                </Box>
              )}
            >
              {admins.map((admin) => (
                <MenuItem key={admin._id} value={admin._id}>
                  <Checkbox checked={form.assignedAdmins.indexOf(admin._id) > -1} />
                  <ListItemText primary={admin.name} secondary={admin.email} />
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Select one or more admins responsible for this department.
            </Typography>
          </FormControl>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Visibility</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox checked={form.hidden} name="hidden" onChange={handleChange} />
            <Typography variant="body2">Hidden (internal only)</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            If checked, this department will not be visible to clients.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={() => onSubmit(form)} variant="contained">{initial ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

const Departments = () => {
  const dispatch = useDispatch();
  const { items: departments, loading } = useSelector((state) => state.departments);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleAdd = () => {
    setEdit(null);
    setOpen(true);
  };
  const handleEdit = (dept) => {
    setEdit(dept);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    await dispatch(deleteDepartment(id));
  };
  const handleSubmit = async (form) => {
    if (edit) {
      await dispatch(updateDepartment({ id: edit._id, data: form }));
    } else {
      await dispatch(createDepartment(form));
    }
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Departments</Typography>
        <Button variant="contained" onClick={handleAdd}>Add Department</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Hidden</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept) => (
              <TableRow key={dept._id}>
                <TableCell>{dept.name}</TableCell>
                <TableCell>{dept.description}</TableCell>
                <TableCell>{dept.email}</TableCell>
                <TableCell>{dept.hidden ? 'Yes' : 'No'}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit"><IconButton onClick={() => handleEdit(dept)}><Edit /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => handleDelete(dept._id)}><Delete /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {departments.length === 0 && !loading && (
              <TableRow><TableCell colSpan={5} align="center">No departments found.</TableCell></TableRow>
            )}
            {loading && (
              <TableRow><TableCell colSpan={5} align="center"><CircularProgress size={24} /></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DepartmentForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} initial={edit} />
    </Box>
  );
};

export default Departments; 