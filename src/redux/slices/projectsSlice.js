import { createSlice } from '@reduxjs/toolkit';
import projectsData from '../../data/projects.json';
import { generateUniqueId, generateProjectId } from '../../utils/idGenerator';
import { getCurrentTimestamp } from '../../utils/dateUtils';

const initialState = {
  items: projectsData.projects,
  loading: false,
  error: null,
  filters: {
    owner: null,
    program: null,
    priority: null,
    currentStep: null,
    currentStepStatus: null,
    dueDateFrom: null,
    dueDateTo: null
  }
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      const existingIds = state.items.map((p) => p.uniqueId);
      const existingProjectIds = state.items.map((p) => p.projectId);

      const newProject = {
        ...action.payload,
        uniqueId: generateUniqueId(existingIds),
        projectId: action.payload.projectId || generateProjectId(existingProjectIds),
        status: action.payload.status || 'New',
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp()
      };

      state.items.push(newProject);
    },

    updateProject: (state, action) => {
      const index = state.items.findIndex(
        (p) => p.uniqueId === action.payload.uniqueId
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: getCurrentTimestamp()
        };
      }
    },

    deleteProject: (state, action) => {
      state.items = state.items.filter(
        (p) => p.uniqueId !== action.payload
      );
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  addProject,
  updateProject,
  deleteProject,
  setFilters,
  clearFilters,
  setLoading,
  setError
} = projectsSlice.actions;

export default projectsSlice.reducer;
