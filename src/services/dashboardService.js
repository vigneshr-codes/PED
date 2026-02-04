import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const dashboardService = {
  fetchStats: async () => {
    const response = await apiClient.get(ENDPOINTS.DASHBOARD.STATS);
    return response.data;
  },

  fetchProjectProgress: async () => {
    const response = await apiClient.get(ENDPOINTS.DASHBOARD.PROJECT_PROGRESS);
    return response.data;
  },

  fetchTaskProgress: async () => {
    const response = await apiClient.get(ENDPOINTS.DASHBOARD.TASK_PROGRESS);
    return response.data;
  },
};
