import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me')
};

export const policyService = {
  getUserPolicies: () => api.get('/policies'),
  createPolicy: (data) => api.post('/policies', data),
  getActivePolicy: () => api.get('/policies/active'),
  getPolicyDetails: (policyId) => api.get(`/policies/${policyId}`),
  getPolicyClaims: (policyId) => api.get(`/policies/${policyId}/claims`)
};

export const claimService = {
  getUserClaims: () => api.get('/claims'),
  getClaimDetails: (claimId) => api.get(`/claims/${claimId}`),
  getClaimStatus: (claimId) => api.get(`/claims/${claimId}/status`),
  getTransactions: () => api.get('/claims/transactions'),
  getEarningsSummary: () => api.get('/claims/summary/earnings')
};

export default api;
