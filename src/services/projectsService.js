import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const projectsService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.BY_ID(id));
    return response.data;
  },

  fetchByStatus: async (status) => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.BY_STATUS(status));
    return response.data;
  },

  fetchByClient: async (clientId) => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.BY_CLIENT(clientId));
    return response.data;
  },

  fetchByManager: async (managerId) => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.BY_MANAGER(managerId));
    return response.data;
  },

  fetchOverdue: async () => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.OVERDUE);
    return response.data;
  },

  fetchOverEstimate: async () => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.OVER_ESTIMATE);
    return response.data;
  },

  search: async (name) => {
    const response = await apiClient.get(ENDPOINTS.PROJECTS.SEARCH(name));
    return response.data;
  },

  create: async (projectData) => {
    const response = await apiClient.post(ENDPOINTS.PROJECTS.BASE, projectData);
    return response.data;
  },

  update: async (id, projectData) => {
    const response = await apiClient.put(ENDPOINTS.PROJECTS.BY_ID(id), projectData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.PROJECTS.BY_ID(id));
    return response.data;
  },
};
