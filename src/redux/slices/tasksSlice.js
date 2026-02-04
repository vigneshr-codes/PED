import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tasksService } from '../../services/tasksService';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await tasksService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (id, { rejectWithValue }) => {
    try {
      return await tasksService.fetchById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasksByStatus = createAsyncThunk(
  'tasks/fetchTasksByStatus',
  async (status, { rejectWithValue }) => {
    try {
      return await tasksService.fetchByStatus(status);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasksByPriority = createAsyncThunk(
  'tasks/fetchTasksByPriority',
  async (priority, { rejectWithValue }) => {
    try {
      return await tasksService.fetchByPriority(priority);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasksByProject = createAsyncThunk(
  'tasks/fetchTasksByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      return await tasksService.fetchByProject(projectId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTasksByEmployee = createAsyncThunk(
  'tasks/fetchTasksByEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      return await tasksService.fetchByEmployee(employeeId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchActiveTasksByEmployee = createAsyncThunk(
  'tasks/fetchActiveTasksByEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      return await tasksService.fetchActiveByEmployee(employeeId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOverdueTasks = createAsyncThunk(
  'tasks/fetchOverdueTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await tasksService.fetchOverdue();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOverEstimateTasks = createAsyncThunk(
  'tasks/fetchOverEstimateTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await tasksService.fetchOverEstimate();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchTasks = createAsyncThunk(
  'tasks/searchTasks',
  async (title, { rejectWithValue }) => {
    try {
      return await tasksService.search(title);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      return await tasksService.create(taskData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      return await tasksService.update(id, taskData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await tasksService.delete(id);
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTasksByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasksByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTasksByPriority.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByPriority.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasksByPriority.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTasksByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTasksByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasksByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchActiveTasksByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveTasksByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchActiveTasksByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOverdueTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverdueTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOverdueTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOverEstimateTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOverEstimateTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOverEstimateTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(searchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default tasksSlice.reducer;
