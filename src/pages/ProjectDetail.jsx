import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectHeader from '../components/project/ProjectHeader';
import ProjectForm from '../components/project/ProjectForm';
import { Modal, Button, Alert } from '../components/common';
import { updateProject } from '../redux/slices/projectsSlice';
import { getProjectSummary } from '../utils/currentStepCalculator';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: projects } = useSelector((state) => state.projects);
  const { items: scopes } = useSelector((state) => state.scopes);
  const { items: estimates } = useSelector((state) => state.estimates);
  const { items: veRecords } = useSelector((state) => state.ve);
  const { items: users } = useSelector((state) => state.users);

  const [showEditModal, setShowEditModal] = useState(false);

  // Find project
  const project = projects.find((p) => p.uniqueId === id);

  // Get project summary with user names
  const projectSummary = useMemo(() => {
    if (!project) return null;
    return getProjectSummary(project, scopes, estimates, veRecords, users);
  }, [project, scopes, estimates, veRecords, users]);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert variant="error" title="Project not found">
          The project you&apos;re looking for doesn&apos;t exist.
        </Alert>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  // Handlers
  const handleEditProject = (formData) => {
    dispatch(updateProject({ ...formData, uniqueId: id }));
    setShowEditModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <ProjectHeader
        project={projectSummary}
        onEdit={() => setShowEditModal(true)}
      />

      {/* Project Details */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Program</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{project.program || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Client</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{project.client || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">EPIC ID</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{project.epicId || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">UFD</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{project.ufd || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{project.status || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Priority</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{project.priority || '-'}</p>
            </div>
          </div>

          {project.notes && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Notes / Description</p>
              <p className="mt-2 text-sm text-gray-700">{project.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Project Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Project"
        size="lg"
      >
        <ProjectForm
          initialData={project}
          isEdit
          onSubmit={handleEditProject}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetail;
