import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach JWT token if present ──────────────────────────
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('electvote_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 globally ─────────────────────────────────
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('electvote_token');
      localStorage.removeItem('electvote_user');
      window.dispatchEvent(new Event('electvote:logout'));
    }
    return Promise.reject(error);
  }
);

export default client;
