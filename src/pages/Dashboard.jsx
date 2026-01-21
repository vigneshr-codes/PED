import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { KPICard } from '../components/common';
import ProjectsTable from '../components/dashboard/ProjectsTable';
import { getProjectSummary } from '../utils/currentStepCalculator';

// Simple icons
const FolderIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const Dashboard = () => {
  const { items: projects } = useSelector((state) => state.projects);
  const { items: scopes } = useSelector((state) => state.scopes);
  const { items: estimates } = useSelector((state) => state.estimates);
  const { items: veRecords } = useSelector((state) => state.ve);
  const { items: users } = useSelector((state) => state.users);

  // Calculate project summaries
  const projectSummaries = useMemo(() => {
    return projects.map((project) =>
      getProjectSummary(project, scopes, estimates, veRecords, users)
    );
  }, [projects, scopes, estimates, veRecords, users]);

  // Simple KPIs
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Active').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Estimates Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage project estimates
        </p>
      </div>

      {/* Simple KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <KPICard
          title="Total Projects"
          value={totalProjects}
          icon={FolderIcon}
          color="blue"
        />
        <KPICard
          title="Active Projects"
          value={activeProjects}
          icon={FolderIcon}
          color="green"
        />
      </div>

      {/* Projects Table */}
      <ProjectsTable projects={projectSummaries} />
    </div>
  );
};

export default Dashboard;
