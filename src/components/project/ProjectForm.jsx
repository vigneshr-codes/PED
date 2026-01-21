import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select, TextArea, Button } from '../common';
import { PROJECT_STATUSES, PRIORITIES } from '../../constants/statusConfig';
import { validateProject } from '../../utils/validators';
import { toInputDate } from '../../utils/dateUtils';

const ProjectForm = ({ initialData = {}, onSubmit, onCancel, isEdit = false }) => {
  const { items: users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    projectId: initialData.projectId || '',
    projectName: initialData.projectName || '',
    projectOwner: initialData.projectOwner || '',
    estimator: initialData.estimator || '',
    program: initialData.program || '',
    client: initialData.client || '',
    epicId: initialData.epicId || '',
    ufd: initialData.ufd || '',
    targetDeliveryDate: toInputDate(initialData.targetDeliveryDate) || '',
    estimateNeededBy: toInputDate(initialData.estimateNeededBy) || '',
    priority: initialData.priority || '',
    notes: initialData.notes || '',
    status: initialData.status || 'New'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateProject(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ownerOptions = users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.role})`
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project ID - optional, auto-generated if empty */}
        <Input
          label="Project ID"
          placeholder="Auto-generated if left empty"
          value={formData.projectId}
          onChange={(e) => handleChange('projectId', e.target.value)}
          error={errors.projectId}
        />

        {/* Project Name - required */}
        <Input
          label="Project Name"
          required
          placeholder="Enter project name"
          value={formData.projectName}
          onChange={(e) => handleChange('projectName', e.target.value)}
          error={errors.projectName}
        />

        {/* Project Owner - required */}
        <Select
          label="Project Owner"
          required
          options={ownerOptions}
          value={formData.projectOwner}
          onChange={(e) => handleChange('projectOwner', e.target.value)}
          error={errors.projectOwner}
          placeholder="Select owner"
        />

        {/* Estimator - recommended */}
        <Select
          label="Estimator"
          options={ownerOptions}
          value={formData.estimator}
          onChange={(e) => handleChange('estimator', e.target.value)}
          placeholder="Select estimator"
        />

        {/* Program / Portfolio */}
        <Input
          label="Program / Portfolio"
          placeholder="e.g., Digital Transformation"
          value={formData.program}
          onChange={(e) => handleChange('program', e.target.value)}
        />

        {/* Client / Org */}
        <Input
          label="Client / Org"
          placeholder="e.g., Acme Corp"
          value={formData.client}
          onChange={(e) => handleChange('client', e.target.value)}
        />

        {/* EPIC ID */}
        <Input
          label="EPIC ID / Tracking ID"
          placeholder="e.g., EPIC-1234"
          value={formData.epicId}
          onChange={(e) => handleChange('epicId', e.target.value)}
        />

        {/* UFD */}
        <Input
          label="UFD"
          placeholder="Enter UFD reference"
          value={formData.ufd}
          onChange={(e) => handleChange('ufd', e.target.value)}
        />

        {/* Target Delivery Date */}
        <Input
          label="Target Delivery Date"
          type="date"
          value={formData.targetDeliveryDate}
          onChange={(e) => handleChange('targetDeliveryDate', e.target.value)}
        />

        {/* Estimate Needed By - recommended */}
        <Input
          label="Estimate Needed By"
          type="date"
          value={formData.estimateNeededBy}
          onChange={(e) => handleChange('estimateNeededBy', e.target.value)}
        />

        {/* Priority */}
        <Select
          label="Priority"
          options={PRIORITIES}
          value={formData.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          placeholder="Select priority"
        />

        {/* Status */}
        <Select
          label="Project Status"
          options={PROJECT_STATUSES}
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value)}
        />
      </div>

      {/* Notes */}
      <TextArea
        label="Notes / Description"
        placeholder="Add any additional notes or description..."
        value={formData.notes}
        onChange={(e) => handleChange('notes', e.target.value)}
        rows={4}
      />

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
