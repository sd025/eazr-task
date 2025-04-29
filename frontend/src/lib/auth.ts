import axios from 'axios';

const API = axios.create({ baseURL: '/api/auth' });

export interface LoginData { email: string; password: string; }
export interface RegisterData { name: string; email: string; password: string; }

export const login = (data: LoginData) =>
  API.post('/login', data);

export const register = (data: RegisterData) =>
  API.post('/signup', data);
