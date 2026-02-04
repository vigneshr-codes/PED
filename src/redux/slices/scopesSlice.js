import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { scopesService } from '../../services/scopesService';
import { statusHistoryService } from '../../services/statusHistoryService';
import { fetchHistoryByProject } from './historySlice';

export const fetchScopes = createAsyncThunk(
  'scopes/fetchScopes',
  async (_, { rejectWithValue }) => {
    try {
      return await scopesService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchScopesByProject = createAsyncThunk(
  'scopes/fetchScopesByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await scopesService.fetchByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLatestScopeByProject = createAsyncThunk(
  'scopes/fetchLatestScopeByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await scopesService.fetchLatestByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createScope = createAsyncThunk(
  'scopes/createScope',
  async (scopeData, { rejectWithValue }) => {
    try {
      return await scopesService.create(scopeData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateScope = createAsyncThunk(
  'scopes/updateScope',
  async ({ id, scopeData }, { rejectWithValue }) => {
    try {
      return await scopesService.update(id, scopeData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateScopeStatus = createAsyncThunk(
  'scopes/updateScopeStatus',
  async ({ id, status, updatedBy, projectId, reason }, { rejectWithValue, dispatch }) => {
    try {
      const updatedScope = await scopesService.update(id, { status, updatedBy });

      await statusHistoryService.create({
        projectId,
        module: 'Scope',
        recordId: id,
        fromStatus: reason?.fromStatus || '',
        toStatus: status,
        reason: reason?.reason || `Status changed to ${status}`,
        changedBy: updatedBy
      });

      dispatch(fetchHistoryByProject(projectId));

      return updatedScope;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteScope = createAsyncThunk(
  'scopes/deleteScope',
  async ({ id, projectId }, { rejectWithValue, dispatch }) => {
    try {
      await scopesService.delete(id);
      // Refresh scopes for this project after deletion (backend reassigns isLatest)
      dispatch(fetchScopesByProject(projectId));
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

const scopesSlice = createSlice({
  name: 'scopes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScopes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScopes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchScopes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchScopesByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScopesByProject.fulfilled, (state, action) => {
        state.loading = false;
        // Merge: replace scopes for this project, keep others
        const projectId = action.meta.arg;
        const otherScopes = state.items.filter((s) => s.projectId !== projectId);
        state.items = [...otherScopes, ...action.payload];
      })
      .addCase(fetchScopesByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLatestScopeByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestScopeByProject.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.items.findIndex((s) => s.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      })
      .addCase(fetchLatestScopeByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createScope.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createScope.fulfilled, (state, action) => {
        state.loading = false;
        // Backend handles isLatest, so mark existing project scopes accordingly
        state.items = state.items.map((s) =>
          s.projectId === action.payload.projectId ? { ...s, isLatest: false } : s
        );
        state.items.push(action.payload);
      })
      .addCase(createScope.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateScope.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScope.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateScope.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateScopeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScopeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateScopeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteScope.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteScope.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((s) => s.id !== action.payload);
      })
      .addCase(deleteScope.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default scopesSlice.reducer;
