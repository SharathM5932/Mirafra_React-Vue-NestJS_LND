// product.d.ts
import type { Category } from './category';

export interface Category {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string | Category;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface UpdateProductDto {
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
}

export interface ProductsResponse {
  message: string;
  products: Product[];
}

export interface SingleProductResponse {
  message: string;
  product: Product;
}