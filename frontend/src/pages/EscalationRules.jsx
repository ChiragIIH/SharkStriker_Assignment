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
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEscalationRules,
  createEscalationRule,
  updateEscalationRule,
  deleteEscalationRule,
} from '../redux/slices/escalationRuleSlice';

const conditionFields = [
  { value: 'department', label: 'Department' },
  { value: 'status', label: 'Status' },
  { value: 'priority', label: 'Priority' },
  { value: 'time_elapsed', label: 'Time Elapsed (hours)' },
];
const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
];
const actionTypes = [
  { value: 'assign_department', label: 'Assign to Department' },
  { value: 'change_status', label: 'Change Status' },
  { value: 'update_priority', label: 'Update Priority' },
  { value: 'escalate_to', label: 'Escalate to User/Role' },
  { value: 'add_reply', label: 'Add Ticket Reply' },
];
const logicOptions = [
  { value: 'AND', label: 'All conditions (AND)' },
  { value: 'OR', label: 'Any condition (OR)' },
];

const EscalationRuleForm = ({ open, onClose, onSubmit, initial }) => {
  const [form, setForm] = useState(
    initial || {
      name: '',
      logic: 'AND',
      conditions: [],
      actions: [],
    }
  );

  useEffect(() => {
    setForm(
      initial || {
        name: '',
        logic: 'AND',
        conditions: [],
        actions: [],
      }
    );
  }, [initial]);

  // Condition handlers
  const handleCondChange = (idx, field, value) => {
    setForm((prev) => {
      const conditions = [...prev.conditions];
      conditions[idx] = { ...conditions[idx], [field]: value };
      return { ...prev, conditions };
    });
  };
  const addCondition = () => {
    setForm((prev) => ({ ...prev, conditions: [...prev.conditions, { field: '', operator: '', value: '' }] }));
  };
  const removeCondition = (idx) => {
    setForm((prev) => ({ ...prev, conditions: prev.conditions.filter((_, i) => i !== idx) }));
  };

  // Action handlers
  const handleActionChange = (idx, field, value) => {
    setForm((prev) => {
      const actions = [...prev.actions];
      actions[idx] = { ...actions[idx], [field]: value };
      return { ...prev, actions };
    });
  };
  const addAction = () => {
    setForm((prev) => ({ ...prev, actions: [...prev.actions, { type: '', value: '', message: '' }] }));
  };
  const removeAction = (idx) => {
    setForm((prev) => ({ ...prev, actions: prev.actions.filter((_, i) => i !== idx) }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initial ? 'Edit' : 'Add'} Escalation Rule</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
        <TextField label="Rule Name" name="name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth required sx={{ mb: 2 }} />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel>Logic</InputLabel>
          <Select value={form.logic} label="Logic" onChange={e => setForm(f => ({ ...f, logic: e.target.value }))}>
            {logicOptions.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
          </Select>
        </FormControl>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Conditions</Typography>
          {form.conditions.map((cond, idx) => (
            <Stack direction="row" spacing={2} alignItems="center" key={idx} sx={{ mb: 1 }}>
              <FormControl sx={{ minWidth: 140 }} size="small">
                <InputLabel>Field</InputLabel>
                <Select value={cond.field} label="Field" onChange={e => handleCondChange(idx, 'field', e.target.value)}>
                  {conditionFields.map(f => <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel>Operator</InputLabel>
                <Select value={cond.operator} label="Operator" onChange={e => handleCondChange(idx, 'operator', e.target.value)}>
                  {operators.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Value" value={cond.value} onChange={e => handleCondChange(idx, 'value', e.target.value)} size="small" sx={{ minWidth: 120 }} />
              <IconButton onClick={() => removeCondition(idx)}><Delete /></IconButton>
            </Stack>
          ))}
          <Button onClick={addCondition} size="small" variant="outlined" startIcon={<Add />}>Add Condition</Button>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>Actions</Typography>
          {form.actions.map((action, idx) => (
            <Stack direction="row" spacing={2} alignItems="center" key={idx} sx={{ mb: 1 }}>
              <FormControl sx={{ minWidth: 180 }} size="small">
                <InputLabel>Action Type</InputLabel>
                <Select value={action.type} label="Action Type" onChange={e => handleActionChange(idx, 'type', e.target.value)}>
                  {actionTypes.map(a => <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Value" value={action.value} onChange={e => handleActionChange(idx, 'value', e.target.value)} size="small" sx={{ minWidth: 120 }} />
              {action.type === 'add_reply' && (
                <TextField label="Message" value={action.message} onChange={e => handleActionChange(idx, 'message', e.target.value)} size="small" sx={{ minWidth: 180 }} />
              )}
              <IconButton onClick={() => removeAction(idx)}><Delete /></IconButton>
            </Stack>
          ))}
          <Button onClick={addAction} size="small" variant="outlined" startIcon={<Add />}>Add Action</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSubmit(form)} variant="contained">{initial ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

const EscalationRules = () => {
  const dispatch = useDispatch();
  const { items: rules, loading } = useSelector((state) => state.escalationRules);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchEscalationRules());
  }, [dispatch]);

  const handleAdd = () => {
    setEdit(null);
    setOpen(true);
  };
  const handleEdit = (rule) => {
    setEdit(rule);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    await dispatch(deleteEscalationRule(id));
  };
  const handleSubmit = async (form) => {
    if (edit) {
      await dispatch(updateEscalationRule({ id: edit._id, data: form }));
    } else {
      await dispatch(createEscalationRule(form));
    }
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Escalation Rules</Typography>
        <Button variant="contained" onClick={handleAdd} startIcon={<Add />}>Add Rule</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Logic</TableCell>
              <TableCell>Conditions</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule._id}>
                <TableCell>{rule.name}</TableCell>
                <TableCell>{rule.logic}</TableCell>
                <TableCell>
                  <Stack direction="column" spacing={1}>
                    {rule.conditions.map((c, i) => (
                      <Chip key={i} label={`${c.field} ${c.operator} ${c.value}`} size="small" />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="column" spacing={1}>
                    {rule.actions.map((a, i) => (
                      <Chip key={i} label={`${a.type}${a.value ? ': ' + a.value : ''}${a.message ? ' (' + a.message + ')' : ''}`} size="small" />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>{rule.createdBy?.name || '-'}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit"><IconButton onClick={() => handleEdit(rule)}><Edit /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => handleDelete(rule._id)}><Delete /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {rules.length === 0 && !loading && (
              <TableRow><TableCell colSpan={6} align="center">No rules found.</TableCell></TableRow>
            )}
            {loading && (
              <TableRow><TableCell colSpan={6} align="center"><CircularProgress size={24} /></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EscalationRuleForm open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} initial={edit} />
    </Box>
  );
};

export default EscalationRules; 