import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Select, TextArea, Button } from '../common';
import { validateVE } from '../../utils/validators';

const VEForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const { items: users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    submissionName: initialData.submissionName || '',
    veToolReference: initialData.veToolReference || '',
    veFTP: initialData.veFTP || '',
    veDollarValue: initialData.veDollarValue || '',
    stakeholders: initialData.stakeholders || [],
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

    const validation = validateVE(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        veFTP: formData.veFTP ? Number(formData.veFTP) : null,
        veDollarValue: formData.veDollarValue ? Number(formData.veDollarValue) : null
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = users
    .filter((u) => u.role === 'Approver' || u.role === 'Admin')
    .map((user) => ({
      value: user.id,
      label: `${user.name} (${user.role})`
    }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="VE Submission Name"
        required
        placeholder="Enter submission name"
        value={formData.submissionName}
        onChange={(e) => handleChange('submissionName', e.target.value)}
        error={errors.submissionName}
      />

      <Input
        label="VE Tool Reference / Link"
        required
        placeholder="https://vetool.company.com/submissions/..."
        value={formData.veToolReference}
        onChange={(e) => handleChange('veToolReference', e.target.value)}
        error={errors.veToolReference}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="VE FTP / Effort (Hours)"
          type="number"
          placeholder="e.g., 1200"
          value={formData.veFTP}
          onChange={(e) => handleChange('veFTP', e.target.value)}
        />

        <Input
          label="VE Dollar Value"
          type="number"
          placeholder="e.g., 180000"
          value={formData.veDollarValue}
          onChange={(e) => handleChange('veDollarValue', e.target.value)}
        />
      </div>

      <Select
        label="Stakeholders / Approver"
        options={userOptions}
        value={formData.stakeholders[0] || ''}
        onChange={(e) =>
          handleChange('stakeholders', e.target.value ? [e.target.value] : [])
        }
        placeholder="Select stakeholder"
      />

      <TextArea
        label="Notes"
        placeholder="Add any notes..."
        value={formData.notes}
        onChange={(e) => handleChange('notes', e.target.value)}
        rows={3}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Add VE Record
        </Button>
      </div>
    </form>
  );
};

export default VEForm;
