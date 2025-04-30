import axios from 'axios';
import { Task } from './types/Task';

const API = axios.create({ baseURL: '/api/tasks' });

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getTasks = () =>
  API.get<Task[]>('/', { headers: getAuthHeaders() });

export const deleteTask = (id: string) =>
  API.delete(`/${id}`, { headers: getAuthHeaders() });

export const createTask = (task: Partial<Task>) =>
  API.post('/', task, { headers: getAuthHeaders() });

export const updateTask = (id: string, task: Partial<Task>) =>
  API.put(`/${id}`, task, { headers: getAuthHeaders() });