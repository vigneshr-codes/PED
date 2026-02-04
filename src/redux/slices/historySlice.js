import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { statusHistoryService } from '../../services/statusHistoryService';

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      return await statusHistoryService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHistoryByProject = createAsyncThunk(
  'history/fetchHistoryByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await statusHistoryService.fetchByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createHistoryEntry = createAsyncThunk(
  'history/createHistoryEntry',
  async (historyData, { rejectWithValue }) => {
    try {
      return await statusHistoryService.create(historyData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteHistoryEntry = createAsyncThunk(
  'history/deleteHistoryEntry',
  async (id, { rejectWithValue }) => {
    try {
      await statusHistoryService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchHistoryByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoryByProject.fulfilled, (state, action) => {
        state.loading = false;
        const projectId = action.meta.arg;
        const otherHistory = state.items.filter((h) => h.projectId !== projectId);
        state.items = [...otherHistory, ...action.payload];
      })
      .addCase(fetchHistoryByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createHistoryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHistoryEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createHistoryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteHistoryEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHistoryEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((h) => h.id !== action.payload);
      })
      .addCase(deleteHistoryEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default historySlice.reducer;
