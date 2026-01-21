/**
 * Format currency value
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined) return '-';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Format number with commas
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined) return '-';

  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Format FTP hours
 */
export const formatFTP = (value) => {
  if (value === null || value === undefined) return '-';
  return `${formatNumber(value)} hrs`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};
