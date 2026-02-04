import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { veTrackingService } from '../../services/veTrackingService';
import { statusHistoryService } from '../../services/statusHistoryService';
import { fetchHistoryByProject } from './historySlice';

export const fetchVERecords = createAsyncThunk(
  've/fetchVERecords',
  async (_, { rejectWithValue }) => {
    try {
      return await veTrackingService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVEByProject = createAsyncThunk(
  've/fetchVEByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await veTrackingService.fetchByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLatestVEByProject = createAsyncThunk(
  've/fetchLatestVEByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await veTrackingService.fetchLatestByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPendingApprovals = createAsyncThunk(
  've/fetchPendingApprovals',
  async (_, { rejectWithValue }) => {
    try {
      return await veTrackingService.fetchPendingApprovals();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createVERecord = createAsyncThunk(
  've/createVERecord',
  async (veData, { rejectWithValue }) => {
    try {
      return await veTrackingService.create(veData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVERecord = createAsyncThunk(
  've/updateVERecord',
  async ({ id, veData }, { rejectWithValue }) => {
    try {
      return await veTrackingService.update(id, veData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVEStatus = createAsyncThunk(
  've/updateVEStatus',
  async ({ id, status, projectId, reason }, { rejectWithValue, dispatch }) => {
    try {
      const updatedVE = await veTrackingService.update(id, { status });

      await statusHistoryService.create({
        projectId,
        module: 'VE',
        recordId: id,
        fromStatus: reason?.fromStatus || '',
        toStatus: status,
        reason: reason?.reason || `Status changed to ${status}`,
        changedBy: reason?.changedBy || ''
      });

      dispatch(fetchHistoryByProject(projectId));

      return updatedVE;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVERecord = createAsyncThunk(
  've/deleteVERecord',
  async ({ id, projectId }, { rejectWithValue, dispatch }) => {
    try {
      await veTrackingService.delete(id);
      // Refresh VE records for this project after deletion (backend reassigns isLatest)
      dispatch(fetchVEByProject(projectId));
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

const veSlice = createSlice({
  name: 've',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVERecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVERecords.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVERecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchVEByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVEByProject.fulfilled, (state, action) => {
        state.loading = false;
        const projectId = action.meta.arg;
        const otherRecords = state.items.filter((v) => v.projectId !== projectId);
        state.items = [...otherRecords, ...action.payload];
      })
      .addCase(fetchVEByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLatestVEByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestVEByProject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.items.findIndex((v) => v.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      })
      .addCase(fetchLatestVEByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPendingApprovals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        state.loading = false;
        // Merge pending approvals into existing items
        action.payload.forEach((pendingVE) => {
          const index = state.items.findIndex((v) => v.id === pendingVE.id);
          if (index !== -1) {
            state.items[index] = pendingVE;
          } else {
            state.items.push(pendingVE);
          }
        });
      })
      .addCase(fetchPendingApprovals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createVERecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVERecord.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((v) =>
          v.projectId === action.payload.projectId ? { ...v, isLatest: false } : v
        );
        state.items.push(action.payload);
      })
      .addCase(createVERecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateVERecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVERecord.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateVERecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateVEStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVEStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((v) => v.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateVEStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteVERecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVERecord.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((v) => v.id !== action.payload);
      })
      .addCase(deleteVERecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default veSlice.reducer;
