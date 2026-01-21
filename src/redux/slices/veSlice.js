import { createSlice } from '@reduxjs/toolkit';
import veData from '../../data/veTracking.json';
import { generateId } from '../../utils/idGenerator';
import { getCurrentTimestamp } from '../../utils/dateUtils';

const initialState = {
  items: veData.veRecords,
  loading: false,
  error: null
};

const veSlice = createSlice({
  name: 've',
  initialState,
  reducers: {
    addVERecord: (state, action) => {
      // Mark all existing VE records for this project as not latest
      state.items = state.items.map((ve) =>
        ve.projectId === action.payload.projectId
          ? { ...ve, isLatest: false }
          : ve
      );

      const newVE = {
        ...action.payload,
        id: generateId('ve'),
        status: action.payload.status || 'Yet to Submit',
        isLatest: true,
        submittedDate: null,
        approvedDate: null,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp()
      };

      state.items.push(newVE);
    },

    updateVERecord: (state, action) => {
      const index = state.items.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: getCurrentTimestamp()
        };
      }
    },

    updateVEStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.items.findIndex((v) => v.id === id);

      if (index !== -1) {
        const updates = {
          status,
          updatedAt: getCurrentTimestamp()
        };

        // Auto-set dates based on status
        if (
          status === 'Estimate Submitted in EDR' &&
          !state.items[index].submittedDate
        ) {
          updates.submittedDate = getCurrentTimestamp();
        }

        if (status === 'Estimate Fully Approved') {
          updates.approvedDate = getCurrentTimestamp();
        }

        state.items[index] = {
          ...state.items[index],
          ...updates
        };
      }
    },

    deleteVERecord: (state, action) => {
      const veToDelete = state.items.find((v) => v.id === action.payload);
      state.items = state.items.filter((v) => v.id !== action.payload);

      // If deleted VE was latest, mark the most recent remaining VE as latest
      if (veToDelete?.isLatest) {
        const projectVEs = state.items
          .filter((v) => v.projectId === veToDelete.projectId)
          .sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

        if (projectVEs.length > 0) {
          const latestIndex = state.items.findIndex(
            (v) => v.id === projectVEs[0].id
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
  addVERecord,
  updateVERecord,
  updateVEStatus,
  deleteVERecord,
  setLoading,
  setError
} = veSlice.actions;

export default veSlice.reducer;
