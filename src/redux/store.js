import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import scopesReducer from './slices/scopesSlice';
import estimatesReducer from './slices/estimatesSlice';
import veReducer from './slices/veSlice';
import historyReducer from './slices/historySlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    scopes: scopesReducer,
    estimates: estimatesReducer,
    ve: veReducer,
    history: historyReducer,
    users: usersReducer
  }
});

export default store;
