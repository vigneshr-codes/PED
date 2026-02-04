import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectsService } from '../../services/projectsService';

export const fetchLegacyProjects = createAsyncThunk(
  'legacyProjects/fetchLegacyProjects',
  async (_, { rejectWithValue }) => {
    try {
      return await projectsService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLegacyProjectById = createAsyncThunk(
  'legacyProjects/fetchLegacyProjectById',
  async (id, { rejectWithValue }) => {
    try {
      return await projectsService.fetchById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLegacyProjectsByStatus = createAsyncThunk(
  'legacyProjects/fetchLegacyProjectsByStatus',
  async (status, { rejectWithValue }) => {
    try {
      return await projectsService.fetchByStatus(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLegacyProjectsByClient = createAsyncThunk(
  'legacyProjects/fetchLegacyProjectsByClient',
  async (clientId, { rejectWithValue }) => {
    try {
      return await projectsService.fetchByClient(clientId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLegacyProjectsByManager = createAsyncThunk(
  'legacyProjects/fetchLegacyProjectsByManager',
  async (managerId, { rejectWithValue }) => {
    try {
      return await projectsService.fetchByManager(managerId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOverdueProjects = createAsyncThunk(
  'legacyProjects/fetchOverdueProjects',
  async (_, { rejectWithValue }) => {
    try {
      return await projectsService.fetchOverdue();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOverEstimateProjects = createAsyncThunk(
  'legacyProjects/fetchOverEstimateProjects',
  async (_, { rejectWithValue }) => {
    try {
      return await projectsService.fetchOverEstimate();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchLegacyProjects = createAsyncThunk(
  'legacyProjects/searchLegacyProjects',
  async (name, { rejectWithValue }) => {
    try {
      return await projectsService.search(name);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createLegacyProject = createAsyncThunk(
  'legacyProjects/createLegacyProject',
  async (projectData, { rejectWithValue }) => {
    try {
      return await projectsService.create(projectData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLegacyProject = createAsyncThunk(
  'legacyProjects/updateLegacyProject',
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      return await projectsService.update(id, projectData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLegacyProject = createAsyncThunk(
  'legacyProjects/deleteLegacyProject',
  async (id, { rejectWithValue }) => {
    try {
      await projectsService.delete(id);
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

const legacyProjectsSlice = createSlice({
  name: 'legacyProjects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLegacyProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegacyProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLegacyProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLegacyProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegacyProjectById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchLegacyProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLegacyProjectsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegacyProjectsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLegacyProjectsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLegacyProjectsByClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegacyProjectsByClient.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLegacyProjectsByClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLegacyProjectsByManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegacyProjectsByManager.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLegacyProjectsByManager.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOverdueProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverdueProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOverdueProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOverEstimateProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverEstimateProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOverEstimateProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchLegacyProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchLegacyProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchLegacyProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createLegacyProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLegacyProject.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createLegacyProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateLegacyProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLegacyProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateLegacyProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteLegacyProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLegacyProject.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteLegacyProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default legacyProjectsSlice.reducer;
