import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const estimatesService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.BY_ID(id));
    return response.data;
  },

  fetchByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.BY_PROJECT(projectId));
    return response.data;
  },

  fetchByStatus: async (status) => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.BY_STATUS(status));
    return response.data;
  },

  fetchByType: async (type) => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.BY_TYPE(type));
    return response.data;
  },

  fetchByOwner: async (owner) => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.BY_OWNER(owner));
    return response.data;
  },

  fetchLatest: async () => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.LATEST);
    return response.data;
  },

  fetchLatestByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.LATEST_BY_PROJECT(projectId));
    return response.data;
  },

  search: async (name) => {
    const response = await apiClient.get(ENDPOINTS.ESTIMATES.SEARCH(name));
    return response.data;
  },

  create: async (estimateData) => {
    const response = await apiClient.post(ENDPOINTS.ESTIMATES.BASE, estimateData);
    return response.data;
  },

  update: async (id, estimateData) => {
    const response = await apiClient.put(ENDPOINTS.ESTIMATES.BY_ID(id), estimateData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.ESTIMATES.BY_ID(id));
    return response.data;
  },
};
