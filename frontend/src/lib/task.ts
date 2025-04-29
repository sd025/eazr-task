import axios from 'axios';
import { Task } from './types/Task';

const API = axios.create({ baseURL: '/api/tasks' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = () => API.get<Task[]>('/');
export const deleteTask = (id: string) => API.delete(`/${id}`);