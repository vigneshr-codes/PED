import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const statusHistoryService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.BY_ID(id));
    return response.data;
  },

  fetchByProject: async (projectId) => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.BY_PROJECT(projectId));
    return response.data;
  },

  fetchByModule: async (module) => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.BY_MODULE(module));
    return response.data;
  },

  fetchByRecord: async (recordId) => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.BY_RECORD(recordId));
    return response.data;
  },

  fetchByChangedBy: async (changedBy) => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.BY_CHANGED_BY(changedBy));
    return response.data;
  },

  fetchByProjectAndModule: async (projectId, module) => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.BY_PROJECT_AND_MODULE(projectId, module));
    return response.data;
  },

  fetchByDateRange: async (startDate, endDate) => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.DATE_RANGE(startDate, endDate));
    return response.data;
  },

  fetchOrdered: async () => {
    const response = await apiClient.get(ENDPOINTS.STATUS_HISTORY.ORDERED);
    return response.data;
  },

  create: async (historyData) => {
    const response = await apiClient.post(ENDPOINTS.STATUS_HISTORY.BASE, historyData);
    return response.data;
  },

  update: async (id, historyData) => {
    const response = await apiClient.put(ENDPOINTS.STATUS_HISTORY.BY_ID(id), historyData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.STATUS_HISTORY.BY_ID(id));
    return response.data;
  },
};
