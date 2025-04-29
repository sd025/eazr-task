import axios from 'axios';

const API = axios.create({ baseURL: '/api/auth' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginData { email: string; password: string; }
export interface RegisterData { name: string; email: string; password: string; }

export const login = (data: LoginData) =>
  API.post('/login', data);

export const register = (data: RegisterData) =>
  API.post('/signup', data);
