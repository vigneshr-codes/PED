import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FilterBar, Alert } from '../components/common';
import DashboardKPIs from '../components/dashboard/DashboardKPIs';
import ProjectsTable from '../components/dashboard/ProjectsTable';
import { setFilters, clearFilters, fetchProjects } from '../redux/slices/projectsSlice';
import { getProjectSummary, calculateKPIs } from '../utils/currentStepCalculator';
import { PRIORITIES } from '../constants/statusConfig';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: projects, filters, loading, error } = useSelector((state) => state.projects);
  const { items: scopes } = useSelector((state) => state.scopes);
  const { items: estimates } = useSelector((state) => state.estimates);
  const { items: veRecords } = useSelector((state) => state.ve);
  const { items: users } = useSelector((state) => state.users);

  // Calculate project summaries with current step
  const projectSummaries = useMemo(() => {
    return projects.map((project) =>
      getProjectSummary(project, scopes, estimates, veRecords, users)
    );
  }, [projects, scopes, estimates, veRecords, users]);

  // Apply filters
  const filteredProjects = useMemo(() => {
    return projectSummaries.filter((project) => {
      if (filters.owner && project.projectOwner !== filters.owner) return false;
      if (filters.program && project.program !== filters.program) return false;
      if (filters.priority && project.priority !== filters.priority) return false;
      if (filters.currentStep && project.currentStep !== filters.currentStep) return false;
      if (filters.currentStepStatus && project.currentStepStatus !== filters.currentStepStatus) return false;
      if (filters.dueDateFrom) {
        const fromDate = new Date(filters.dueDateFrom);
        const projectDate = new Date(project.estimateNeededBy);
        if (projectDate < fromDate) return false;
      }
      if (filters.dueDateTo) {
        const toDate = new Date(filters.dueDateTo);
        const projectDate = new Date(project.estimateNeededBy);
        if (projectDate > toDate) return false;
      }
      return true;
    });
  }, [projectSummaries, filters]);

  // Calculate KPIs
  const kpis = useMemo(() => {
    return calculateKPIs(projects, scopes, estimates, veRecords, users);
  }, [projects, scopes, estimates, veRecords, users]);

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const owners = [...new Set(projects.map((p) => p.projectOwner))].map((id) => {
      const user = users.find((u) => u.id === id);
      return { value: id, label: user?.name || id };
    });

    const programs = [...new Set(projects.map((p) => p.program).filter(Boolean))].map(
      (p) => ({ value: p, label: p })
    );

    const steps = ['Scope', 'Estimate', 'VE', 'Done'].map((s) => ({
      value: s,
      label: s
    }));

    const statuses = [
      ...new Set(projectSummaries.map((p) => p.currentStepStatus))
    ].map((s) => ({ value: s, label: s }));

    return {
      owners,
      programs,
      priorities: PRIORITIES.map((p) => ({ value: p, label: p })),
      steps,
      statuses
    };
  }, [projects, users, projectSummaries]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleKPIClick = (kpiKey) => {
    // Quick filter based on KPI clicked
    switch (kpiKey) {
      case 'overdue':
        // Filter would need special handling for overdue
        break;
      case 'scopeCompleted':
        dispatch(setFilters({ currentStep: 'Estimate' }));
        break;
      case 'estimatesInReview':
        dispatch(setFilters({ currentStep: 'Estimate' }));
        break;
      case 'veWaitingApproval':
        dispatch(setFilters({ currentStep: 'VE', currentStepStatus: 'Waiting for Approval' }));
        break;
      default:
        break;
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="error" title="Failed to load projects">
          {error}
          <button
            onClick={() => dispatch(fetchProjects())}
            className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
          >
            Retry
          </button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Estimates Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage project estimates across all stages
        </p>
      </div>

      {/* KPI Cards */}
      <DashboardKPIs kpis={kpis} onKPIClick={handleKPIClick} />

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        options={filterOptions}
      />

      {/* Projects Table */}
      <ProjectsTable projects={filteredProjects} />
    </div>
  );
};

export default Dashboard;
