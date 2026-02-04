import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { estimatesService } from '../../services/estimatesService';
import { statusHistoryService } from '../../services/statusHistoryService';
import { fetchHistoryByProject } from './historySlice';

export const fetchEstimates = createAsyncThunk(
  'estimates/fetchEstimates',
  async (_, { rejectWithValue }) => {
    try {
      return await estimatesService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEstimatesByProject = createAsyncThunk(
  'estimates/fetchEstimatesByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await estimatesService.fetchByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLatestEstimateByProject = createAsyncThunk(
  'estimates/fetchLatestEstimateByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await estimatesService.fetchLatestByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEstimate = createAsyncThunk(
  'estimates/createEstimate',
  async (estimateData, { rejectWithValue }) => {
    try {
      return await estimatesService.create(estimateData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEstimate = createAsyncThunk(
  'estimates/updateEstimate',
  async ({ id, estimateData }, { rejectWithValue }) => {
    try {
      return await estimatesService.update(id, estimateData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEstimateStatus = createAsyncThunk(
  'estimates/updateEstimateStatus',
  async ({ id, status, projectId, reason }, { rejectWithValue, dispatch }) => {
    try {
      const updatedEstimate = await estimatesService.update(id, { status });

      await statusHistoryService.create({
        projectId,
        module: 'Estimate',
        recordId: id,
        fromStatus: reason?.fromStatus || '',
        toStatus: status,
        reason: reason?.reason || `Status changed to ${status}`,
        changedBy: reason?.changedBy || ''
      });

      dispatch(fetchHistoryByProject(projectId));

      return updatedEstimate;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEstimate = createAsyncThunk(
  'estimates/deleteEstimate',
  async ({ id, projectId }, { rejectWithValue, dispatch }) => {
    try {
      await estimatesService.delete(id);
      // Refresh estimates for this project after deletion (backend reassigns isLatest)
      dispatch(fetchEstimatesByProject(projectId));
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

const estimatesSlice = createSlice({
  name: 'estimates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstimates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEstimates.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEstimates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchEstimatesByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEstimatesByProject.fulfilled, (state, action) => {
        state.loading = false;
        const projectId = action.meta.arg;
        const otherEstimates = state.items.filter((e) => e.projectId !== projectId);
        state.items = [...otherEstimates, ...action.payload];
      })
      .addCase(fetchEstimatesByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLatestEstimateByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestEstimateByProject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.items.findIndex((e) => e.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      })
      .addCase(fetchLatestEstimateByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createEstimate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEstimate.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((e) =>
          e.projectId === action.payload.projectId ? { ...e, isLatest: false } : e
        );
        state.items.push(action.payload);
      })
      .addCase(createEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEstimate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateEstimateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEstimateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateEstimateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteEstimate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEstimate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default estimatesSlice.reducer;
