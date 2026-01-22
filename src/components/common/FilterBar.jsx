import React from 'react';
import { Filter, X } from 'lucide-react';
import Select from './Select';
import Input from './Input';
import Button from './Button';

const FilterBar = ({ filters, onFilterChange, onClearFilters, options }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(v => v);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <Select
          label="Owner"
          value={filters.owner || ''}
          onChange={(e) => handleChange('owner', e.target.value)}
          options={options.owners}
          placeholder="All Owners"
          className="w-44"
        />

        <Select
          label="Program"
          value={filters.program || ''}
          onChange={(e) => handleChange('program', e.target.value)}
          options={options.programs}
          placeholder="All Programs"
          className="w-44"
        />

        <Select
          label="Priority"
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          options={options.priorities}
          placeholder="All"
          className="w-32"
        />

        <Select
          label="Current Step"
          value={filters.currentStep || ''}
          onChange={(e) => handleChange('currentStep', e.target.value)}
          options={options.steps}
          placeholder="All Steps"
          className="w-36"
        />

        <Select
          label="Status"
          value={filters.currentStepStatus || ''}
          onChange={(e) => handleChange('currentStepStatus', e.target.value)}
          options={options.statuses}
          placeholder="All Statuses"
          className="w-44"
        />

        <Input
          label="Due From"
          type="date"
          value={filters.dueDateFrom || ''}
          onChange={(e) => handleChange('dueDateFrom', e.target.value)}
          className="w-44"
        />

        <Input
          label="Due To"
          type="date"
          value={filters.dueDateTo || ''}
          onChange={(e) => handleChange('dueDateTo', e.target.value)}
          className="w-44"
        />
      </div>
    </div>
  );
};

export default FilterBar;
