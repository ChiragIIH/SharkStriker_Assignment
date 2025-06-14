import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/users', userData),
  login: (userData) => api.post('/users/login', userData),
  getProfile: () => api.get('/users/profile'),
};

// User API calls
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getAdmins: () => api.get('/departments/admins/list'),
};

export const departmentAPI = {
  create: (data) => api.post('/departments', data),
  list: () => api.get('/departments'),
  get: (id) => api.get(`/departments/${id}`),
  update: (id, data) => api.put(`/departments/${id}`, data),
  remove: (id) => api.delete(`/departments/${id}`),
};

export const ticketAPI = {
  create: (data) => api.post('/tickets', data),
  list: (params) => api.get('/tickets', { params }),
  get: (id) => api.get(`/tickets/${id}`),
  update: (id, data) => api.put(`/tickets/${id}`, data),
  remove: (id) => api.delete(`/tickets/${id}`),
};

export default api; 