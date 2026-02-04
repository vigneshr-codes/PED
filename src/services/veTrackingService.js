import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const veTrackingService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.BY_ID(id));
    return response.data;
  },

  fetchByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.BY_PROJECT(projectId));
    return response.data;
  },

  fetchByStatus: async (status) => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.BY_STATUS(status));
    return response.data;
  },

  fetchBySubmittedBy: async (submittedBy) => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.BY_SUBMITTED_BY(submittedBy));
    return response.data;
  },

  fetchLatest: async () => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.LATEST);
    return response.data;
  },

  fetchLatestByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.LATEST_BY_PROJECT(projectId));
    return response.data;
  },

  fetchPendingApprovals: async () => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.PENDING_APPROVALS);
    return response.data;
  },

  search: async (name) => {
    const response = await apiClient.get(ENDPOINTS.VE_TRACKING.SEARCH(name));
    return response.data;
  },

  create: async (veData) => {
    const response = await apiClient.post(ENDPOINTS.VE_TRACKING.BASE, veData);
    return response.data;
  },

  update: async (id, veData) => {
    const response = await apiClient.put(ENDPOINTS.VE_TRACKING.BY_ID(id), veData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.VE_TRACKING.BY_ID(id));
    return response.data;
  },
};
