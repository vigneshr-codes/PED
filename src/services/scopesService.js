import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const scopesService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.BY_ID(id));
    return response.data;
  },

  fetchByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.BY_PROJECT(projectId));
    return response.data;
  },

  fetchByStatus: async (status) => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.BY_STATUS(status));
    return response.data;
  },

  fetchByType: async (type) => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.BY_TYPE(type));
    return response.data;
  },

  fetchByCreatedBy: async (createdBy) => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.BY_CREATED_BY(createdBy));
    return response.data;
  },

  fetchLatest: async () => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.LATEST);
    return response.data;
  },

  fetchLatestByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.LATEST_BY_PROJECT(projectId));
    return response.data;
  },

  search: async (title) => {
    const response = await apiClient.get(ENDPOINTS.SCOPES.SEARCH(title));
    return response.data;
  },

  create: async (scopeData) => {
    const response = await apiClient.post(ENDPOINTS.SCOPES.BASE, scopeData);
    return response.data;
  },

  update: async (id, scopeData) => {
    const response = await apiClient.put(ENDPOINTS.SCOPES.BY_ID(id), scopeData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.SCOPES.BY_ID(id));
    return response.data;
  },
};
