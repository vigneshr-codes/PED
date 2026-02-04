export const ENDPOINTS = {
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    BY_ROLE: (role) => `/users/role/${role}`,
    BY_EMAIL: (email) => `/users/email/${email}`,
    SEARCH: (name) => `/users/search?name=${name}`,
  },

  PROJECT_INFO: {
    BASE: '/project-info',
    BY_UNIQUE_ID: (uniqueId) => `/project-info/${uniqueId}`,
    BY_PROJECT_ID: (projectId) => `/project-info/project-id/${projectId}`,
    BY_STATUS: (status) => `/project-info/status/${status}`,
    BY_PRIORITY: (priority) => `/project-info/priority/${priority}`,
    BY_OWNER: (owner) => `/project-info/owner/${owner}`,
    BY_ESTIMATOR: (estimator) => `/project-info/estimator/${estimator}`,
    BY_PROGRAM: (program) => `/project-info/program/${program}`,
    BY_CLIENT: (client) => `/project-info/client/${client}`,
    SEARCH: (term) => `/project-info/search?term=${term}`,
  },

  ESTIMATES: {
    BASE: '/estimates',
    BY_ID: (id) => `/estimates/${id}`,
    BY_PROJECT: (projectId) => `/estimates/project/${projectId}`,
    BY_STATUS: (status) => `/estimates/status/${status}`,
    BY_TYPE: (type) => `/estimates/type/${type}`,
    BY_OWNER: (owner) => `/estimates/owner/${owner}`,
    LATEST: '/estimates/latest',
    LATEST_BY_PROJECT: (projectId) => `/estimates/project/${projectId}/latest`,
    SEARCH: (name) => `/estimates/search?name=${name}`,
  },

  SCOPES: {
    BASE: '/scopes',
    BY_ID: (id) => `/scopes/${id}`,
    BY_PROJECT: (projectId) => `/scopes/project/${projectId}`,
    BY_STATUS: (status) => `/scopes/status/${status}`,
    BY_TYPE: (type) => `/scopes/type/${type}`,
    BY_CREATED_BY: (createdBy) => `/scopes/created-by/${createdBy}`,
    LATEST: '/scopes/latest',
    LATEST_BY_PROJECT: (projectId) => `/scopes/project/${projectId}/latest`,
    SEARCH: (title) => `/scopes/search?title=${title}`,
  },

  VE_TRACKING: {
    BASE: '/ve-tracking',
    BY_ID: (id) => `/ve-tracking/${id}`,
    BY_PROJECT: (projectId) => `/ve-tracking/project/${projectId}`,
    BY_STATUS: (status) => `/ve-tracking/status/${status}`,
    BY_SUBMITTED_BY: (submittedBy) => `/ve-tracking/submitted-by/${submittedBy}`,
    LATEST: '/ve-tracking/latest',
    LATEST_BY_PROJECT: (projectId) => `/ve-tracking/project/${projectId}/latest`,
    SEARCH: (name) => `/ve-tracking/search?name=${name}`,
    PENDING_APPROVALS: '/ve-tracking/pending-approvals',
  },

  STATUS_HISTORY: {
    BASE: '/status-history',
    BY_ID: (id) => `/status-history/${id}`,
    BY_PROJECT: (projectId) => `/status-history/project/${projectId}`,
    BY_MODULE: (module) => `/status-history/module/${module}`,
    BY_RECORD: (recordId) => `/status-history/record/${recordId}`,
    BY_CHANGED_BY: (changedBy) => `/status-history/changed-by/${changedBy}`,
    BY_PROJECT_AND_MODULE: (projectId, module) => `/status-history/project/${projectId}/module/${module}`,
    DATE_RANGE: (startDate, endDate) => `/status-history/date-range?startDate=${startDate}&endDate=${endDate}`,
    ORDERED: '/status-history/ordered',
  },

  CLIENTS: {
    BASE: '/clients',
    BY_ID: (id) => `/clients/${id}`,
    BY_INDUSTRY: (industry) => `/clients/industry/${industry}`,
    SEARCH: (term) => `/clients/search?term=${term}`,
  },

  EMPLOYEES: {
    BASE: '/employees',
    BY_ID: (id) => `/employees/${id}`,
    BY_ROLE: (role) => `/employees/role/${role}`,
    BY_DEPARTMENT: (department) => `/employees/department/${department}`,
    SEARCH: (name) => `/employees/search?name=${name}`,
    PROJECT_MANAGERS: '/employees/project-managers',
  },

  PROJECTS: {
    BASE: '/projects',
    BY_ID: (id) => `/projects/${id}`,
    BY_STATUS: (status) => `/projects/status/${status}`,
    BY_CLIENT: (clientId) => `/projects/client/${clientId}`,
    BY_MANAGER: (managerId) => `/projects/manager/${managerId}`,
    SEARCH: (name) => `/projects/search?name=${name}`,
    OVERDUE: '/projects/overdue',
    OVER_ESTIMATE: '/projects/over-estimate',
  },

  TASKS: {
    BASE: '/tasks',
    BY_ID: (id) => `/tasks/${id}`,
    BY_STATUS: (status) => `/tasks/status/${status}`,
    BY_PRIORITY: (priority) => `/tasks/priority/${priority}`,
    BY_PROJECT: (projectId) => `/tasks/project/${projectId}`,
    BY_EMPLOYEE: (employeeId) => `/tasks/employee/${employeeId}`,
    SEARCH: (title) => `/tasks/search?title=${title}`,
    OVERDUE: '/tasks/overdue',
    OVER_ESTIMATE: '/tasks/over-estimate',
    ACTIVE_BY_EMPLOYEE: (employeeId) => `/tasks/employee/${employeeId}/active`,
  },

  DASHBOARD: {
    STATS: '/dashboard/stats',
    PROJECT_PROGRESS: '/dashboard/project-progress',
    TASK_PROGRESS: '/dashboard/task-progress',
  },
};
