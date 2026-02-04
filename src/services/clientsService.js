import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const clientsService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.CLIENTS.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.CLIENTS.BY_ID(id));
    return response.data;
  },

  fetchByIndustry: async (industry) => {
    const response = await apiClient.get(ENDPOINTS.CLIENTS.BY_INDUSTRY(industry));
    return response.data;
  },

  search: async (term) => {
    const response = await apiClient.get(ENDPOINTS.CLIENTS.SEARCH(term));
    return response.data;
  },

  create: async (clientData) => {
    const response = await apiClient.post(ENDPOINTS.CLIENTS.BASE, clientData);
    return response.data;
  },

  update: async (id, clientData) => {
    const response = await apiClient.put(ENDPOINTS.CLIENTS.BY_ID(id), clientData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.CLIENTS.BY_ID(id));
    return response.data;
  },
};
