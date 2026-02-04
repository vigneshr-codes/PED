import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const usersService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.USERS.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  fetchByRole: async (role) => {
    const response = await apiClient.get(ENDPOINTS.USERS.BY_ROLE(role));
    return response.data;
  },

  fetchByEmail: async (email) => {
    const response = await apiClient.get(ENDPOINTS.USERS.BY_EMAIL(email));
    return response.data;
  },

  search: async (name) => {
    const response = await apiClient.get(ENDPOINTS.USERS.SEARCH(name));
    return response.data;
  },

  create: async (userData) => {
    const response = await apiClient.post(ENDPOINTS.USERS.BASE, userData);
    return response.data;
  },

  update: async (id, userData) => {
    const response = await apiClient.put(ENDPOINTS.USERS.BY_ID(id), userData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },
};
