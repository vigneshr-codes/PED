import React, { useState } from 'react';
import { Input, Select, TextArea, Button } from '../common';
import { SCOPE_TYPES } from '../../constants/statusConfig';
import { validateScope } from '../../utils/validators';

const ScopeForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    scopeTitle: initialData.scopeTitle || '',
    scopeType: initialData.scopeType || '',
    artifactLink: initialData.artifactLink || '',
    comments: initialData.comments || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateScope(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Scope Title"
        required
        placeholder="Enter scope title"
        value={formData.scopeTitle}
        onChange={(e) => handleChange('scopeTitle', e.target.value)}
        error={errors.scopeTitle}
      />

      <Select
        label="Scope Type"
        options={SCOPE_TYPES}
        value={formData.scopeType}
        onChange={(e) => handleChange('scopeType', e.target.value)}
        placeholder="Select type"
      />

      <Input
        label="Artifact Link"
        required
        placeholder="https://sharepoint.com/docs/..."
        value={formData.artifactLink}
        onChange={(e) => handleChange('artifactLink', e.target.value)}
        error={errors.artifactLink}
      />

      <TextArea
        label="Comments / Notes"
        placeholder="Add any comments..."
        value={formData.comments}
        onChange={(e) => handleChange('comments', e.target.value)}
        rows={3}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Add Scope
        </Button>
      </div>
    </form>
  );
};

export default ScopeForm;
