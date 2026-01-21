import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select, TextArea, Button } from '../common';
import { ESTIMATE_TYPES } from '../../constants/statusConfig';
import { validateEstimate } from '../../utils/validators';

const EstimateForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const { items: users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    estimateName: initialData.estimateName || '',
    estimateType: initialData.estimateType || '',
    workbookLink: initialData.workbookLink || '',
    estimatedFTP: initialData.estimatedFTP || '',
    estimatedDollarValue: initialData.estimatedDollarValue || '',
    currency: initialData.currency || 'USD',
    estimateOwner: initialData.estimateOwner || '',
    internalReviewers: initialData.internalReviewers || [],
    externalReviewers: initialData.externalReviewers || [],
    notes: initialData.notes || ''
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

    const validation = validateEstimate({
      ...formData,
      estimatedFTP: Number(formData.estimatedFTP),
      estimatedDollarValue: Number(formData.estimatedDollarValue)
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        estimatedFTP: Number(formData.estimatedFTP),
        estimatedDollarValue: Number(formData.estimatedDollarValue)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.role})`
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Estimate Name"
          required
          placeholder="Enter estimate name"
          value={formData.estimateName}
          onChange={(e) => handleChange('estimateName', e.target.value)}
          error={errors.estimateName}
        />

        <Select
          label="Estimate Type"
          options={ESTIMATE_TYPES}
          value={formData.estimateType}
          onChange={(e) => handleChange('estimateType', e.target.value)}
          placeholder="Select type"
        />
      </div>

      <Input
        label="Workbook Link"
        required
        placeholder="https://sharepoint.com/docs/estimate.xlsx"
        value={formData.workbookLink}
        onChange={(e) => handleChange('workbookLink', e.target.value)}
        error={errors.workbookLink}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Estimated FTP (Hours)"
          required
          type="number"
          placeholder="e.g., 1200"
          value={formData.estimatedFTP}
          onChange={(e) => handleChange('estimatedFTP', e.target.value)}
          error={errors.estimatedFTP}
        />

        <Input
          label="Estimated Dollar Value"
          required
          type="number"
          placeholder="e.g., 180000"
          value={formData.estimatedDollarValue}
          onChange={(e) => handleChange('estimatedDollarValue', e.target.value)}
          error={errors.estimatedDollarValue}
        />

        <Select
          label="Currency"
          options={['USD', 'EUR', 'GBP', 'INR']}
          value={formData.currency}
          onChange={(e) => handleChange('currency', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Estimate Owner"
          required
          options={userOptions}
          value={formData.estimateOwner}
          onChange={(e) => handleChange('estimateOwner', e.target.value)}
          error={errors.estimateOwner}
          placeholder="Select owner"
        />

        <Select
          label="Internal Reviewers"
          options={userOptions}
          value={formData.internalReviewers[0] || ''}
          onChange={(e) =>
            handleChange('internalReviewers', e.target.value ? [e.target.value] : [])
          }
          placeholder="Select reviewer"
        />
      </div>

      <TextArea
        label="Notes / Assumptions"
        placeholder="Add any notes or assumptions..."
        value={formData.notes}
        onChange={(e) => handleChange('notes', e.target.value)}
        rows={3}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Add Estimate
        </Button>
      </div>
    </form>
  );
};

export default EstimateForm;
