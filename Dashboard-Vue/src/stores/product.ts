// src/stores/product.ts
import { defineStore } from 'pinia';
import { ProductService } from '@/services/product.service';
import type { 
  Product, 
  CreateProductDto, 
  UpdateProductDto,
  ProductsResponse,
  SingleProductResponse
} from '@/types/product';

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
  }),

  getters: {
    getCategoryName: (state) => (product: Product) => {
      if (!product.category) return 'Uncategorized';
      return typeof product.category === 'string' 
        ? product.category 
        : product.category.name;
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await ProductService.getAll();
        this.products = response.products;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch products';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(id: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await ProductService.getById(id);
        this.currentProduct = response.product;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch product';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createProduct(data: CreateProductDto) {
      this.loading = true;
      this.error = null;
      try {
        const response = await ProductService.create(data);
        this.products.push(response.product);
        return response;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create product';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProduct(id: string, data: UpdateProductDto) {
      this.loading = true;
      this.error = null;
      try {
        const response = await ProductService.update(id, data);
        const index = this.products.findIndex(p => p._id === id);
        if (index !== -1) {
          this.products[index] = response.product;
        }
        if (this.currentProduct?._id === id) {
          this.currentProduct = response.product;
        }
        return response;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update product';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id: string) {
      this.loading = true;
      this.error = null;
      try {
        await ProductService.delete(id);
        this.products = this.products.filter(p => p._id !== id);
        if (this.currentProduct?._id === id) {
          this.currentProduct = null;
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to delete product';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});