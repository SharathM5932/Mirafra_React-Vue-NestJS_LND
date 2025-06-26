// src/services/category.service.ts
import api from './api';
import { Category, CategoryResponse, SingleCategoryResponse } from '@/types/category';

export const CategoryService = {
  async getAll(): Promise<CategoryResponse> {
    const response = await api.get('http://localhost:3006/categories');
    return response.data;
  },

  async create(name: string): Promise<SingleCategoryResponse> {
    const response = await api.post('http://localhost:3006/categories', { name });
    return response.data;
  },

  async update(id: string, name: string): Promise<SingleCategoryResponse> {
    const response = await api.patch(`http://localhost:3006/categories/${id}`, { name });
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`http://localhost:3006/categories/${id}`);
  }
};