import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './slices/projectsSlice';
import scopesReducer from './slices/scopesSlice';
import estimatesReducer from './slices/estimatesSlice';
import veReducer from './slices/veSlice';
import historyReducer from './slices/historySlice';
import usersReducer from './slices/usersSlice';
import clientsReducer from './slices/clientsSlice';
import employeesReducer from './slices/employeesSlice';
import legacyProjectsReducer from './slices/legacyProjectsSlice';
import tasksReducer from './slices/tasksSlice';
import dashboardReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    scopes: scopesReducer,
    estimates: estimatesReducer,
    ve: veReducer,
    history: historyReducer,
    users: usersReducer,
    clients: clientsReducer,
    employees: employeesReducer,
    legacyProjects: legacyProjectsReducer,
    tasks: tasksReducer,
    dashboard: dashboardReducer
  }
});

export default store;
