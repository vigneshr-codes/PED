import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge, Button } from '../common';
import { formatDate } from '../../utils/dateUtils';

const ProjectHeader = ({ project, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      {/* Top row */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <span className="text-sm text-gray-500">{project.projectId}</span>
            <StatusBadge status={project.status} size="sm" />
            {project.priority && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                project.priority === 'High'
                  ? 'bg-red-50 text-red-600'
                  : project.priority === 'Medium'
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'bg-green-50 text-green-600'
              }`}>
                {project.priority}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            {project.projectName}
          </h1>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit Project
        </Button>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Owner</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {project.ownerName || '-'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Estimator</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {project.estimatorName || '-'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Estimate Needed By</p>
          <p className={`mt-1 text-sm font-medium ${
            project.isOverdue ? 'text-red-600' : 'text-gray-900'
          }`}>
            {formatDate(project.estimateNeededBy)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Target Delivery</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatDate(project.targetDeliveryDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
