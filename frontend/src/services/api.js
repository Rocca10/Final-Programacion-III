import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default api;
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // El token debe estar guardado después del login
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});