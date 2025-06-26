import api from './api';
import type { User, CreateUserDto, UpdateUserDto, UserResponse } from '@/types/user';

export const UserService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<UserResponse | User[]>('http://localhost:3002/users');
    return Array.isArray(response.data) ? response.data : response.data.users;
  },

  async getById(id: string): Promise<User> {
    const response = await api.get<User>(`http://localhost:3002/users/${id}`);
    return response.data;
  },

  async create(data: CreateUserDto): Promise<User> {
    const response = await api.post<User>('http://localhost:3002/users', data);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const response = await api.put<User>(`http://localhost:3002/users/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`http://localhost:3002/users/${id}`);
  },
};