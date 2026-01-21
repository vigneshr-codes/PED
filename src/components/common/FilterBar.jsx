import React from 'react';
import Select from './Select';
import Input from './Input';
import Button from './Button';

const FilterBar = ({ filters, onFilterChange, onClearFilters, options }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <Select
          label="Owner"
          value={filters.owner || ''}
          onChange={(e) => handleChange('owner', e.target.value)}
          options={options.owners}
          placeholder="All Owners"
          className="w-48"
        />

        <Select
          label="Program"
          value={filters.program || ''}
          onChange={(e) => handleChange('program', e.target.value)}
          options={options.programs}
          placeholder="All Programs"
          className="w-48"
        />

        <Select
          label="Priority"
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          options={options.priorities}
          placeholder="All Priorities"
          className="w-36"
        />

        <Select
          label="Current Step"
          value={filters.currentStep || ''}
          onChange={(e) => handleChange('currentStep', e.target.value)}
          options={options.steps}
          placeholder="All Steps"
          className="w-40"
        />

        <Select
          label="Status"
          value={filters.currentStepStatus || ''}
          onChange={(e) => handleChange('currentStepStatus', e.target.value)}
          options={options.statuses}
          placeholder="All Statuses"
          className="w-48"
        />

        <Input
          label="Due Date From"
          type="date"
          value={filters.dueDateFrom || ''}
          onChange={(e) => handleChange('dueDateFrom', e.target.value)}
          className="w-40"
        />

        <Input
          label="Due Date To"
          type="date"
          value={filters.dueDateTo || ''}
          onChange={(e) => handleChange('dueDateTo', e.target.value)}
          className="w-40"
        />

        <Button
          variant="outline"
          size="md"
          onClick={onClearFilters}
          className="mb-0.5"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
