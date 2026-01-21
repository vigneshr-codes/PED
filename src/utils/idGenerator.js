import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique ID with prefix
 */
export const generateId = (prefix = '') => {
  const uuid = uuidv4().split('-')[0]; // Short UUID
  return prefix ? `${prefix}-${uuid}` : uuid;
};

/**
 * Generate a 5-digit unique ID for projects
 */
export const generateUniqueId = (existingIds = []) => {
  const maxId = existingIds.reduce((max, id) => {
    const num = parseInt(id, 10);
    return num > max ? num : max;
  }, 0);

  return String(maxId + 1).padStart(5, '0');
};

/**
 * Generate project ID in format PRJ-YYYY-XXX
 */
export const generateProjectId = (existingProjectIds = []) => {
  const year = new Date().getFullYear();
  const prefix = `PRJ-${year}-`;

  const existingNumbers = existingProjectIds
    .filter(id => id.startsWith(prefix))
    .map(id => parseInt(id.replace(prefix, ''), 10))
    .filter(num => !isNaN(num));

  const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
  const nextNumber = String(maxNumber + 1).padStart(3, '0');

  return `${prefix}${nextNumber}`;
};
