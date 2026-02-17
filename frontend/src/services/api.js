import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getMe: () => api.get('/auth/me'),
    createAdmin: (adminData) => api.post('/auth/create-admin', adminData)
};

// Admin APIs
export const adminAPI = {
    uploadCertificates: (formData) => api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    getAllCertificates: (page = 1, limit = 10) => 
        api.get(`/admin/certificates?page=${page}&limit=${limit}`),
    deleteCertificate: (id) => api.delete(`/admin/certificates/${id}`),
    getStats: () => api.get('/admin/stats'),
    getAllUsers: () => api.get('/admin/users')
};

// Certificate APIs
export const certificateAPI = {
    search: (certificateId) => api.get(`/certificates/search/${certificateId}`),
    download: (certificateId) => api.get(`/certificates/download/${certificateId}`, {
        responseType: 'blob'
    }),
    verify: (data) => api.post('/certificates/verify', data)
};

export default api;