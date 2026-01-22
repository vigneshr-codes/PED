import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { StatusBadge, Button, Stepper } from '../common';
import { formatDate } from '../../utils/dateUtils';

const ProjectHeader = ({ project, currentStepInfo, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
      {/* Top row */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-400">{project.projectId}</span>
            <StatusBadge status={project.status} size="sm" />
            {project.priority && (
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                project.priority === 'High'
                  ? 'bg-red-50 text-red-600'
                  : project.priority === 'Medium'
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-green-50 text-green-600'
              }`}>
                {project.priority}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">
            {project.projectName}
          </h1>
        </div>
        <Button variant="outline" onClick={onEdit} icon={Pencil}>
          Edit Project
        </Button>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-100">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Owner</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            {project.ownerName || '-'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Estimator</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            {project.estimatorName || '-'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Estimate Needed By</p>
          <p className={`mt-1 text-sm font-semibold ${
            project.isOverdue ? 'text-red-600' : 'text-gray-900'
          }`}>
            {formatDate(project.estimateNeededBy)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Target Delivery</p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            {formatDate(project.targetDeliveryDate)}
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="pt-2">
        <Stepper
          currentStep={currentStepInfo.step}
          currentStepNumber={currentStepInfo.stepNumber}
        />
      </div>
    </div>
  );
};

export default ProjectHeader;
