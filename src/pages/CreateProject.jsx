import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProjectForm from '../components/project/ProjectForm';
import { addProject } from '../redux/slices/projectsSlice';

const CreateProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    dispatch(addProject(formData));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the project details to create a new project
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default CreateProject;
