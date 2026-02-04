import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const projectInfoService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BASE);
    return response.data;
  },

  fetchByUniqueId: async (uniqueId) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_UNIQUE_ID(uniqueId));
    return response.data;
  },

  fetchByProjectId: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_PROJECT_ID(projectId));
    return response.data;
  },

  fetchByStatus: async (status) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_STATUS(status));
    return response.data;
  },

  fetchByPriority: async (priority) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_PRIORITY(priority));
    return response.data;
  },

  fetchByOwner: async (owner) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_OWNER(owner));
    return response.data;
  },

  fetchByEstimator: async (estimator) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_ESTIMATOR(estimator));
    return response.data;
  },

  fetchByProgram: async (program) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_PROGRAM(program));
    return response.data;
  },

  fetchByClient: async (client) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.BY_CLIENT(client));
    return response.data;
  },

  search: async (term) => {
    const response = await apiClient.get(ENDPOINTS.PROJECT_INFO.SEARCH(term));
    return response.data;
  },

  create: async (projectData) => {
    const response = await apiClient.post(ENDPOINTS.PROJECT_INFO.BASE, projectData);
    return response.data;
  },

  update: async (uniqueId, projectData) => {
    const response = await apiClient.put(ENDPOINTS.PROJECT_INFO.BY_UNIQUE_ID(uniqueId), projectData);
    return response.data;
  },

  delete: async (uniqueId) => {
    const response = await apiClient.delete(ENDPOINTS.PROJECT_INFO.BY_UNIQUE_ID(uniqueId));
    return response.data;
  },
};
