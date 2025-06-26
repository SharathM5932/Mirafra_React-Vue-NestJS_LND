// src/services/product.service.ts
import api from './api';
import type { 
  Product, 
  CreateProductDto, 
  UpdateProductDto,
  ProductsResponse,
  SingleProductResponse
} from '@/types/product';

export const ProductService = {
  async getAll(): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>('http://localhost:3004/products');
    return response.data;
  },

  async getById(id: string): Promise<SingleProductResponse> {
    const response = await api.get<SingleProductResponse>(`http://localhost:3004/products/${id}`);
    return response.data;
  },

  async create(data: CreateProductDto): Promise<SingleProductResponse> {
    const response = await api.post<SingleProductResponse>('http://localhost:3004/products', data);
    return response.data;
  },

  async update(id: string, data: UpdateProductDto): Promise<SingleProductResponse> {
    const response = await api.patch<SingleProductResponse>(`http://localhost:3004/products/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`http://localhost:3004/products/${id}`);
  }
};