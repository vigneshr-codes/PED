import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProjectHeader from '../components/project/ProjectHeader';
import ProjectForm from '../components/project/ProjectForm';
import ScopeForm from '../components/scope/ScopeForm';
import ScopeList from '../components/scope/ScopeList';
import EstimateForm from '../components/estimate/EstimateForm';
import EstimateList from '../components/estimate/EstimateList';
import VEForm from '../components/ve/VEForm';
import VEList from '../components/ve/VEList';
import HistoryList from '../components/history/HistoryList';
import { Modal, Button, Alert } from '../components/common';
import { updateProject } from '../redux/slices/projectsSlice';
import { createScope } from '../redux/slices/scopesSlice';
import { createEstimate } from '../redux/slices/estimatesSlice';
import { createVERecord } from '../redux/slices/veSlice';
import { fetchScopesByProject } from '../redux/slices/scopesSlice';
import { fetchEstimatesByProject } from '../redux/slices/estimatesSlice';
import { fetchVEByProject } from '../redux/slices/veSlice';
import { fetchHistoryByProject } from '../redux/slices/historySlice';
import { getProjectSummary, calculateCurrentStep } from '../utils/currentStepCalculator';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'scope', label: 'Scope' },
  { id: 'estimate', label: 'Estimate' },
  { id: 've', label: 'VE' },
  { id: 'history', label: 'History' }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: projects } = useSelector((state) => state.projects);
  const { items: scopes } = useSelector((state) => state.scopes);
  const { items: estimates } = useSelector((state) => state.estimates);
  const { items: veRecords } = useSelector((state) => state.ve);
  const { items: users, currentUser } = useSelector((state) => state.users);

  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScopeModal, setShowScopeModal] = useState(false);
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [showVEModal, setShowVEModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch project-specific data on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchScopesByProject(id));
      dispatch(fetchEstimatesByProject(id));
      dispatch(fetchVEByProject(id));
      dispatch(fetchHistoryByProject(id));
    }
  }, [id, dispatch]);

  // Find project
  const project = projects.find((p) => p.uniqueId === id);

  // Get related records
  const projectScopes = scopes
    .filter((s) => s.projectId === id)
    .sort((a, b) => b.version - a.version);

  const projectEstimates = estimates
    .filter((e) => e.projectId === id)
    .sort((a, b) => b.version - a.version);

  const projectVERecords = veRecords
    .filter((v) => v.projectId === id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calculate current step
  const currentStepInfo = useMemo(() => {
    if (!project) return { step: 'Scope', stepNumber: 2, status: 'Not Started' };
    return calculateCurrentStep(project, scopes, estimates, veRecords);
  }, [project, scopes, estimates, veRecords]);

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
  const handleEditProject = async (formData) => {
    setIsSubmitting(true);
    try {
      await dispatch(updateProject({ uniqueId: id, projectData: formData })).unwrap();
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update project:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddScope = async (formData) => {
    setIsSubmitting(true);
    try {
      await dispatch(createScope({
        ...formData,
        projectId: id,
        createdBy: currentUser?.id,
        updatedBy: currentUser?.id
      })).unwrap();
      setShowScopeModal(false);
    } catch (err) {
      console.error('Failed to add scope:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddEstimate = async (formData) => {
    setIsSubmitting(true);
    try {
      await dispatch(createEstimate({
        ...formData,
        projectId: id
      })).unwrap();
      setShowEstimateModal(false);
    } catch (err) {
      console.error('Failed to add estimate:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddVE = async (formData) => {
    setIsSubmitting(true);
    try {
      await dispatch(createVERecord({
        ...formData,
        projectId: id,
        submittedBy: currentUser?.id
      })).unwrap();
      setShowVEModal(false);
    } catch (err) {
      console.error('Failed to add VE record:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Program</p>
                  <p className="mt-1 text-sm font-medium">{project.program || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Client</p>
                  <p className="mt-1 text-sm font-medium">{project.client || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">EPIC ID</p>
                  <p className="mt-1 text-sm font-medium">{project.epicId || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">UFD</p>
                  <p className="mt-1 text-sm font-medium">{project.ufd || '-'}</p>
                </div>
              </div>
              {project.notes && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 uppercase">Notes</p>
                  <p className="mt-1 text-sm text-gray-700">{project.notes}</p>
                </div>
              )}
            </div>

            {/* Quick Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-700">Scope Status</p>
                <p className="mt-1 text-lg font-semibold text-blue-900">
                  {projectSummary?.scopeStatus || 'Not Started'}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {projectScopes.length} version(s)
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-700">Estimate Status</p>
                <p className="mt-1 text-lg font-semibold text-purple-900">
                  {projectSummary?.estimateStatus || 'Not Started'}
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  {projectEstimates.length} version(s)
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm font-medium text-orange-700">VE Status</p>
                <p className="mt-1 text-lg font-semibold text-orange-900">
                  {projectSummary?.veStatus || 'Not Started'}
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  {projectVERecords.length} submission(s)
                </p>
              </div>
            </div>
          </div>
        );

      case 'scope':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Scope Artifacts</h3>
              <Button onClick={() => setShowScopeModal(true)}>Add Scope</Button>
            </div>
            <ScopeList scopes={projectScopes} projectId={id} />
          </div>
        );

      case 'estimate':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Estimate Workbooks</h3>
              <Button onClick={() => setShowEstimateModal(true)}>Add Estimate</Button>
            </div>
            <EstimateList estimates={projectEstimates} projectId={id} />
          </div>
        );

      case 've':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">VE Tool Submissions</h3>
              <Button onClick={() => setShowVEModal(true)}>Add VE Record</Button>
            </div>
            <VEList veRecords={projectVERecords} projectId={id} />
          </div>
        );

      case 'history':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Change History</h3>
            <HistoryList projectId={id} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Stepper */}
      <ProjectHeader
        project={projectSummary}
        currentStepInfo={currentStepInfo}
        onEdit={() => setShowEditModal(true)}
      />

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">{renderTabContent()}</div>
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

      {/* Add Scope Modal */}
      <Modal
        isOpen={showScopeModal}
        onClose={() => setShowScopeModal(false)}
        title="Add Scope Artifact"
        size="md"
      >
        <ScopeForm
          onSubmit={handleAddScope}
          onCancel={() => setShowScopeModal(false)}
        />
      </Modal>

      {/* Add Estimate Modal */}
      <Modal
        isOpen={showEstimateModal}
        onClose={() => setShowEstimateModal(false)}
        title="Add Estimate"
        size="lg"
      >
        <EstimateForm
          onSubmit={handleAddEstimate}
          onCancel={() => setShowEstimateModal(false)}
        />
      </Modal>

      {/* Add VE Modal */}
      <Modal
        isOpen={showVEModal}
        onClose={() => setShowVEModal(false)}
        title="Add VE Submission"
        size="md"
      >
        <VEForm
          onSubmit={handleAddVE}
          onCancel={() => setShowVEModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetail;
