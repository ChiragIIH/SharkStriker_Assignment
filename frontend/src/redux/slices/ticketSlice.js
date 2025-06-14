import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ticketAPI } from '../../services/api';

export const fetchTickets = createAsyncThunk('tickets/fetchAll', async (params) => {
  const res = await ticketAPI.list(params);
  return res.data;
});

export const createTicket = createAsyncThunk('tickets/create', async (data) => {
  const res = await ticketAPI.create(data);
  return res.data;
});

export const updateTicket = createAsyncThunk('tickets/update', async ({ id, data }) => {
  const res = await ticketAPI.update(id, data);
  return res.data;
});

export const deleteTicket = createAsyncThunk('tickets/delete', async (id) => {
  await ticketAPI.remove(id);
  return id;
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t._id !== action.payload);
      });
  },
});

export default ticketSlice.reducer; 