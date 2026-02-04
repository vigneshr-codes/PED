import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const tasksService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.TASKS.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.TASKS.BY_ID(id));
    return response.data;
  },

  fetchByStatus: async (status) => {
    const response = await apiClient.get(ENDPOINTS.TASKS.BY_STATUS(status));
    return response.data;
  },

  fetchByPriority: async (priority) => {
    const response = await apiClient.get(ENDPOINTS.TASKS.BY_PRIORITY(priority));
    return response.data;
  },

  fetchByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.TASKS.BY_PROJECT(projectId));
    return response.data;
  },

  fetchByEmployee: async (employeeId) => {
    const response = await apiClient.get(ENDPOINTS.TASKS.BY_EMPLOYEE(employeeId));
    return response.data;
  },

  fetchActiveByEmployee: async (employeeId) => {
    const response = await apiClient.get(ENDPOINTS.TASKS.ACTIVE_BY_EMPLOYEE(employeeId));
    return response.data;
  },

  fetchOverdue: async () => {
    const response = await apiClient.get(ENDPOINTS.TASKS.OVERDUE);
    return response.data;
  },

  fetchOverEstimate: async () => {
    const response = await apiClient.get(ENDPOINTS.TASKS.OVER_ESTIMATE);
    return response.data;
  },

  search: async (title) => {
    const response = await apiClient.get(ENDPOINTS.TASKS.SEARCH(title));
    return response.data;
  },

  create: async (taskData) => {
    const response = await apiClient.post(ENDPOINTS.TASKS.BASE, taskData);
    return response.data;
  },

  update: async (id, taskData) => {
    const response = await apiClient.put(ENDPOINTS.TASKS.BY_ID(id), taskData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.TASKS.BY_ID(id));
    return response.data;
  },
};
