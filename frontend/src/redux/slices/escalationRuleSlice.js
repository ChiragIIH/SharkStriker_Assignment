import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchEscalationRules = createAsyncThunk('escalationRules/fetchAll', async () => {
  const res = await axios.get(`${API_URL}/escalation-rules`, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}` },
  });
  return res.data;
});

export const createEscalationRule = createAsyncThunk('escalationRules/create', async (data) => {
  const res = await axios.post(`${API_URL}/escalation-rules`, data, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}` },
  });
  return res.data;
});

export const updateEscalationRule = createAsyncThunk('escalationRules/update', async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/escalation-rules/${id}`, data, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}` },
  });
  return res.data;
});

export const deleteEscalationRule = createAsyncThunk('escalationRules/delete', async (id) => {
  await axios.delete(`${API_URL}/escalation-rules/${id}`, {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}` },
  });
  return id;
});

const escalationRuleSlice = createSlice({
  name: 'escalationRules',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEscalationRules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEscalationRules.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEscalationRules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEscalationRule.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEscalationRule.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteEscalationRule.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      });
  },
});

export default escalationRuleSlice.reducer; 