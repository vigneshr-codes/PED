/**
 * Validate project form data
 */
export const validateProject = (data) => {
  const errors = {};

  if (!data.projectName?.trim()) {
    errors.projectName = 'Project Name is required';
  }

  if (!data.projectOwner) {
    errors.projectOwner = 'Project Owner is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate scope form data
 */
export const validateScope = (data) => {
  const errors = {};

  if (!data.scopeTitle?.trim()) {
    errors.scopeTitle = 'Scope Title is required';
  }

  if (!data.artifactLink?.trim()) {
    errors.artifactLink = 'Artifact Link is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate estimate form data
 */
export const validateEstimate = (data) => {
  const errors = {};

  if (!data.estimateName?.trim()) {
    errors.estimateName = 'Estimate Name is required';
  }

  if (!data.workbookLink?.trim()) {
    errors.workbookLink = 'Workbook Link is required';
  }

  if (!data.estimatedFTP || data.estimatedFTP <= 0) {
    errors.estimatedFTP = 'Estimated FTP must be greater than 0';
  }

  if (!data.estimatedDollarValue || data.estimatedDollarValue <= 0) {
    errors.estimatedDollarValue = 'Estimated Dollar Value must be greater than 0';
  }

  if (!data.estimateOwner) {
    errors.estimateOwner = 'Estimate Owner is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate VE form data
 */
export const validateVE = (data) => {
  const errors = {};

  if (!data.submissionName?.trim()) {
    errors.submissionName = 'Submission Name is required';
  }

  if (!data.veToolReference?.trim()) {
    errors.veToolReference = 'VE Tool Reference/Link is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate status change with reason (for backward movements)
 */
export const validateStatusChange = (currentStatus, newStatus, statusList, reason) => {
  const currentIndex = statusList.indexOf(currentStatus);
  const newIndex = statusList.indexOf(newStatus);

  // Moving backward requires a reason
  if (newIndex < currentIndex && !reason?.trim()) {
    return {
      isValid: false,
      error: 'A reason is required when moving to a previous status'
    };
  }

  return { isValid: true, error: null };
};
