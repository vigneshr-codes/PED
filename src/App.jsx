import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import { Header } from './components/common';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import { fetchUsers } from './redux/slices/usersSlice';
import { fetchProjects } from './redux/slices/projectsSlice';
import { fetchScopes } from './redux/slices/scopesSlice';
import { fetchEstimates } from './redux/slices/estimatesSlice';
import { fetchVERecords } from './redux/slices/veSlice';
import { fetchHistory } from './redux/slices/historySlice';
import { fetchClients } from './redux/slices/clientsSlice';
import { fetchEmployees } from './redux/slices/employeesSlice';
import { fetchLegacyProjects } from './redux/slices/legacyProjectsSlice';
import { fetchTasks } from './redux/slices/tasksSlice';
import { fetchDashboardStats, fetchProjectProgress, fetchTaskProgress } from './redux/slices/dashboardSlice';

const AppLoader = () => {
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchUsers()),
          dispatch(fetchProjects()),
          dispatch(fetchScopes()),
          dispatch(fetchEstimates()),
          dispatch(fetchVERecords()),
          dispatch(fetchHistory()),
          dispatch(fetchClients()),
          dispatch(fetchEmployees()),
          dispatch(fetchLegacyProjects()),
          dispatch(fetchTasks()),
          dispatch(fetchDashboardStats()),
          dispatch(fetchProjectProgress()),
          dispatch(fetchTaskProgress())
        ]);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
            <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppLoader />
      </Router>
    </Provider>
  );
}

export default App;
