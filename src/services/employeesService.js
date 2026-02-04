import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export const employeesService = {
  fetchAll: async () => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES.BASE);
    return response.data;
  },

  fetchById: async (id) => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES.BY_ID(id));
    return response.data;
  },

  fetchByRole: async (role) => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES.BY_ROLE(role));
    return response.data;
  },

  fetchByDepartment: async (department) => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES.BY_DEPARTMENT(department));
    return response.data;
  },

  fetchProjectManagers: async () => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES.PROJECT_MANAGERS);
    return response.data;
  },

  search: async (name) => {
    const response = await apiClient.get(ENDPOINTS.EMPLOYEES.SEARCH(name));
    return response.data;
  },

  create: async (employeeData) => {
    const response = await apiClient.post(ENDPOINTS.EMPLOYEES.BASE, employeeData);
    return response.data;
  },

  update: async (id, employeeData) => {
    const response = await apiClient.put(ENDPOINTS.EMPLOYEES.BY_ID(id), employeeData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(ENDPOINTS.EMPLOYEES.BY_ID(id));
    return response.data;
  },
};
