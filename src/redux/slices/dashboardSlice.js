import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '../../services/dashboardService';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchStats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProjectProgress = createAsyncThunk(
  'dashboard/fetchProjectProgress',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchProjectProgress();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskProgress = createAsyncThunk(
  'dashboard/fetchTaskProgress',
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.fetchTaskProgress();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  stats: null,
  projectProgress: null,
  taskProgress: null,
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProjectProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.projectProgress = action.payload;
      })
      .addCase(fetchProjectProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTaskProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.taskProgress = action.payload;
      })
      .addCase(fetchTaskProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer;
