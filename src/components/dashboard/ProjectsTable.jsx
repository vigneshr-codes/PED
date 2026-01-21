import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, StatusBadge } from '../common';
import { formatDate } from '../../utils/dateUtils';

const ProjectsTable = ({ projects }) => {
  const navigate = useNavigate();

  const columns = [
    {
      key: 'projectId',
      header: 'Project ID',
      width: '130px',
      render: (value) => (
        <span className="font-medium text-blue-600">{value}</span>
      )
    },
    {
      key: 'projectName',
      header: 'Project Name',
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '120px',
      render: (value) => <StatusBadge status={value} size="sm" />
    },
    {
      key: 'ownerName',
      header: 'Owner',
      width: '150px',
      render: (value) => <span className="text-gray-600">{value}</span>
    },
    {
      key: 'priority',
      header: 'Priority',
      width: '100px',
      render: (value) => {
        const colors = {
          High: 'text-red-600 bg-red-50',
          Medium: 'text-yellow-600 bg-yellow-50',
          Low: 'text-green-600 bg-green-50'
        };
        return value ? (
          <span className={`px-2 py-1 rounded text-xs font-medium ${colors[value] || ''}`}>
            {value}
          </span>
        ) : <span className="text-gray-400">-</span>;
      }
    },
    {
      key: 'estimateNeededBy',
      header: 'Est. Needed By',
      width: '140px',
      render: (value) => (
        <span className="text-gray-600">{formatDate(value)}</span>
      )
    }
  ];

  const handleRowClick = (row) => {
    navigate(`/projects/${row.uniqueId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
        <span className="text-sm text-gray-500">{projects.length} projects</span>
      </div>
      <Table
        columns={columns}
        data={projects}
        onRowClick={handleRowClick}
        emptyMessage="No projects found. Create your first project to get started."
      />
    </div>
  );
};

export default ProjectsTable;
