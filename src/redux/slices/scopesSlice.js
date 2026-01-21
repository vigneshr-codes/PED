import { createSlice } from '@reduxjs/toolkit';
import scopesData from '../../data/scopes.json';
import { generateId } from '../../utils/idGenerator';
import { getCurrentTimestamp } from '../../utils/dateUtils';

const initialState = {
  items: scopesData.scopes,
  loading: false,
  error: null
};

const scopesSlice = createSlice({
  name: 'scopes',
  initialState,
  reducers: {
    addScope: (state, action) => {
      // Mark all existing scopes for this project as not latest
      state.items = state.items.map((scope) =>
        scope.projectId === action.payload.projectId
          ? { ...scope, isLatest: false }
          : scope
      );

      // Get max version for this project
      const projectScopes = state.items.filter(
        (s) => s.projectId === action.payload.projectId
      );
      const maxVersion =
        projectScopes.length > 0
          ? Math.max(...projectScopes.map((s) => s.version))
          : 0;

      const newScope = {
        ...action.payload,
        id: generateId('scope'),
        version: maxVersion + 1,
        status: action.payload.status || 'Draft',
        isLatest: true,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp()
      };

      state.items.push(newScope);
    },

    updateScope: (state, action) => {
      const index = state.items.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: getCurrentTimestamp()
        };
      }
    },

    updateScopeStatus: (state, action) => {
      const { id, status, updatedBy } = action.payload;
      const index = state.items.findIndex((s) => s.id === id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          status,
          updatedBy,
          updatedAt: getCurrentTimestamp()
        };
      }
    },

    deleteScope: (state, action) => {
      const scopeToDelete = state.items.find((s) => s.id === action.payload);
      state.items = state.items.filter((s) => s.id !== action.payload);

      // If deleted scope was latest, mark the most recent remaining scope as latest
      if (scopeToDelete?.isLatest) {
        const projectScopes = state.items
          .filter((s) => s.projectId === scopeToDelete.projectId)
          .sort((a, b) => b.version - a.version);

        if (projectScopes.length > 0) {
          const latestIndex = state.items.findIndex(
            (s) => s.id === projectScopes[0].id
          );
          if (latestIndex !== -1) {
            state.items[latestIndex].isLatest = true;
          }
        }
      }
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
  addScope,
  updateScope,
  updateScopeStatus,
  deleteScope,
  setLoading,
  setError
} = scopesSlice.actions;

export default scopesSlice.reducer;
