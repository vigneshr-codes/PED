/**
 * Calculate the current step and status for a project based on the workflow
 *
 * Current Step Logic:
 * - If latest Scope status is not Completed → Current Step = Scope
 * - Else if latest Estimate status is not Approved → Current Step = Estimate
 * - Else if latest VE status is not Estimate Fully Approved → Current Step = VE
 * - Else → Current Step = Done
 */

export const calculateCurrentStep = (project, scopes, estimates, veRecords) => {
  // Find the latest records for this project
  const latestScope = scopes.find(
    s => s.projectId === project.uniqueId && s.isLatest
  );
  const latestEstimate = estimates.find(
    e => e.projectId === project.uniqueId && e.isLatest
  );
  const latestVE = veRecords.find(
    v => v.projectId === project.uniqueId && v.isLatest
  );

  // Step 1: Check Scope
  if (!latestScope || latestScope.status !== 'Completed') {
    return {
      step: 'Scope',
      stepNumber: 2,
      status: latestScope?.status || 'Not Started',
      record: latestScope
    };
  }

  // Step 2: Check Estimate
  if (!latestEstimate || latestEstimate.status !== 'Approved') {
    return {
      step: 'Estimate',
      stepNumber: 3,
      status: latestEstimate?.status || 'Not Started',
      record: latestEstimate
    };
  }

  // Step 3: Check VE
  if (!latestVE || latestVE.status !== 'Estimate Fully Approved') {
    return {
      step: 'VE',
      stepNumber: 4,
      status: latestVE?.status || 'Not Started',
      record: latestVE
    };
  }

  // All steps completed
  return {
    step: 'Done',
    stepNumber: 5,
    status: 'Completed',
    record: null
  };
};

/**
 * Get project summary with current step for dashboard
 */
export const getProjectSummary = (project, scopes, estimates, veRecords, users) => {
  const currentStepInfo = calculateCurrentStep(project, scopes, estimates, veRecords);

  // Get latest records
  const latestScope = scopes.find(s => s.projectId === project.uniqueId && s.isLatest);
  const latestEstimate = estimates.find(e => e.projectId === project.uniqueId && e.isLatest);
  const latestVE = veRecords.find(v => v.projectId === project.uniqueId && v.isLatest);

  // Get owner and estimator names
  const owner = users.find(u => u.id === project.projectOwner);
  const estimator = users.find(u => u.id === project.estimator);

  // Calculate if overdue
  const today = new Date();
  const estimateNeededBy = project.estimateNeededBy ? new Date(project.estimateNeededBy) : null;
  const isOverdue = estimateNeededBy && estimateNeededBy < today && currentStepInfo.step !== 'Done';

  return {
    ...project,
    currentStep: currentStepInfo.step,
    currentStepStatus: currentStepInfo.status,
    currentStepNumber: currentStepInfo.stepNumber,
    latestFTP: latestEstimate?.estimatedFTP || latestVE?.veFTP || null,
    latestDollarValue: latestEstimate?.estimatedDollarValue || latestVE?.veDollarValue || null,
    ownerName: owner?.name || 'Unknown',
    estimatorName: estimator?.name || 'Unassigned',
    isOverdue,
    scopeStatus: latestScope?.status || 'Not Started',
    estimateStatus: latestEstimate?.status || 'Not Started',
    veStatus: latestVE?.status || 'Not Started'
  };
};

/**
 * Calculate dashboard KPIs
 */
export const calculateKPIs = (projects, scopes, estimates, veRecords, users) => {
  const projectSummaries = projects.map(p =>
    getProjectSummary(p, scopes, estimates, veRecords, users)
  );

  const activeProjects = projectSummaries.filter(p => p.status === 'Active');

  return {
    totalActive: activeProjects.length,
    scopeCompleted: activeProjects.filter(p =>
      p.scopeStatus === 'Completed'
    ).length,
    estimatesInReview: activeProjects.filter(p =>
      p.estimateStatus === 'Sent for Internal Review' ||
      p.estimateStatus === 'Sent for External Review'
    ).length,
    veWaitingApproval: activeProjects.filter(p =>
      p.veStatus === 'Waiting for Approval'
    ).length,
    overdue: activeProjects.filter(p => p.isOverdue).length,
    done: projectSummaries.filter(p => p.currentStep === 'Done').length
  };
};
