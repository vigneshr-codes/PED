// Project Status
export const PROJECT_STATUSES = ['New', 'Active', 'On Hold', 'Closed'];

// Scope Statuses (Step 2)
export const SCOPE_STATUSES = ['Draft', 'In Progress', 'Grooming', 'Completed'];

// Estimate Statuses (Step 3)
export const ESTIMATE_STATUSES = [
  'Yet to Start',
  'In Progress',
  'Sent for Internal Review',
  'Sent for External Review',
  'Approved'
];

// VE Statuses (Step 4)
export const VE_STATUSES = [
  'Yet to Submit',
  'Estimate Submitted in EDR',
  'Estimate loaded in VE tool',
  'Waiting for Approval',
  'Estimate Fully Approved'
];

// Estimate Types
export const ESTIMATE_TYPES = ['ROM', 'LOE', 'Final'];

// Scope Types
export const SCOPE_TYPES = ['Functional', 'Technical', 'Business', 'Other'];

// Priority Levels
export const PRIORITIES = ['High', 'Medium', 'Low'];

// User Roles
export const USER_ROLES = [
  'Requestor',
  'Estimator',
  'Internal Reviewer',
  'External Reviewer',
  'Approver',
  'Admin'
];

// Workflow Steps
export const WORKFLOW_STEPS = [
  { key: 'project', label: 'Project Creation', number: 1 },
  { key: 'scope', label: 'Scope Tracking', number: 2 },
  { key: 'estimate', label: 'Estimate Tracking', number: 3 },
  { key: 've', label: 'VE Tool Request', number: 4 },
  { key: 'done', label: 'Completed', number: 5 }
];

// Status Colors for UI
export const STATUS_COLORS = {
  // Scope
  'Draft': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Grooming': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Completed': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },

  // Estimate
  'Yet to Start': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  'Sent for Internal Review': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  'Sent for External Review': { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  'Approved': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },

  // VE
  'Yet to Submit': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
  'Estimate Submitted in EDR': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Estimate loaded in VE tool': { bg: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  'Waiting for Approval': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Estimate Fully Approved': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },

  // Project
  'New': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Active': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'On Hold': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  'Closed': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },

  // Current Step
  'Scope': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  'Estimate': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  'VE': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'Done': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },

  // Default
  'default': { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' }
};

// Get status color config
export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || STATUS_COLORS['default'];
};
