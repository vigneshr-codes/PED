import { createSlice } from '@reduxjs/toolkit';
import historyData from '../../data/statusHistory.json';
import { generateId } from '../../utils/idGenerator';
import { getCurrentTimestamp } from '../../utils/dateUtils';

const initialState = {
  items: historyData.history,
  loading: false,
  error: null
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryEntry: (state, action) => {
      const newEntry = {
        ...action.payload,
        id: generateId('hist'),
        changedAt: getCurrentTimestamp()
      };

      state.items.push(newEntry);
    },

    clearProjectHistory: (state, action) => {
      state.items = state.items.filter(
        (h) => h.projectId !== action.payload
      );
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
  addHistoryEntry,
  clearProjectHistory,
  setLoading,
  setError
} = historySlice.actions;

export default historySlice.reducer;
