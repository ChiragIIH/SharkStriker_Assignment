import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { departmentAPI } from '../../services/api';

export const fetchDepartments = createAsyncThunk('departments/fetchAll', async () => {
  const res = await departmentAPI.list();
  return res.data;
});

export const createDepartment = createAsyncThunk('departments/create', async (data) => {
  const res = await departmentAPI.create(data);
  return res.data;
});

export const updateDepartment = createAsyncThunk('departments/update', async ({ id, data }) => {
  const res = await departmentAPI.update(id, data);
  return res.data;
});

export const deleteDepartment = createAsyncThunk('departments/delete', async (id) => {
  await departmentAPI.remove(id);
  return id;
});

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const idx = state.items.findIndex((d) => d._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.items = state.items.filter((d) => d._id !== action.payload);
      });
  },
});

export default departmentSlice.reducer; 