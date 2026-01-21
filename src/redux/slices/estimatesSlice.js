import { createSlice } from '@reduxjs/toolkit';
import estimatesData from '../../data/estimates.json';
import { generateId } from '../../utils/idGenerator';
import { getCurrentTimestamp } from '../../utils/dateUtils';

const initialState = {
  items: estimatesData.estimates,
  loading: false,
  error: null
};

const estimatesSlice = createSlice({
  name: 'estimates',
  initialState,
  reducers: {
    addEstimate: (state, action) => {
      // Mark all existing estimates for this project as not latest
      state.items = state.items.map((estimate) =>
        estimate.projectId === action.payload.projectId
          ? { ...estimate, isLatest: false }
          : estimate
      );

      // Get max version for this project
      const projectEstimates = state.items.filter(
        (e) => e.projectId === action.payload.projectId
      );
      const maxVersion =
        projectEstimates.length > 0
          ? Math.max(...projectEstimates.map((e) => e.version))
          : 0;

      const newEstimate = {
        ...action.payload,
        id: generateId('est'),
        version: maxVersion + 1,
        status: action.payload.status || 'Yet to Start',
        currency: action.payload.currency || 'USD',
        isLatest: true,
        submittedDate: null,
        approvedDate: null,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp()
      };

      state.items.push(newEstimate);
    },

    updateEstimate: (state, action) => {
      const index = state.items.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: getCurrentTimestamp()
        };
      }
    },

    updateEstimateStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex((e) => e.id === id);

      if (index !== -1) {
        const updates = {
          status,
          updatedAt: getCurrentTimestamp()
        };

        // Auto-set dates based on status
        if (
          status === 'Sent for Internal Review' &&
          !state.items[index].submittedDate
        ) {
          updates.submittedDate = getCurrentTimestamp();
        }

        if (status === 'Approved') {
          updates.approvedDate = getCurrentTimestamp();
        }

        state.items[index] = {
          ...state.items[index],
          ...updates
        };
      }
    },

    deleteEstimate: (state, action) => {
      const estimateToDelete = state.items.find((e) => e.id === action.payload);
      state.items = state.items.filter((e) => e.id !== action.payload);

      // If deleted estimate was latest, mark the most recent remaining estimate as latest
      if (estimateToDelete?.isLatest) {
        const projectEstimates = state.items
          .filter((e) => e.projectId === estimateToDelete.projectId)
          .sort((a, b) => b.version - a.version);

        if (projectEstimates.length > 0) {
          const latestIndex = state.items.findIndex(
            (e) => e.id === projectEstimates[0].id
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
  addEstimate,
  updateEstimate,
  updateEstimateStatus,
  deleteEstimate,
  setLoading,
  setError
} = estimatesSlice.actions;

export default estimatesSlice.reducer;
