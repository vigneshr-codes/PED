/**
 * Format date to display string
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '-';

  const date = new Date(dateString);
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };

  return date.toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format date to ISO string for input fields
 */
export const toInputDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

/**
 * Check if date is in the past
 */
export const isPastDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 days")
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
};

/**
 * Get current timestamp in ISO format
 */
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};
