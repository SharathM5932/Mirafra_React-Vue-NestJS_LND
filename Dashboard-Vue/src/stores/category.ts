// src/stores/category.ts
import { defineStore } from 'pinia';
import { CategoryService } from '@/services/category.service';
import type { Category, CategoryResponse, SingleCategoryResponse } from '@/types/category';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const response = await CategoryService.getAll();
        this.categories = response.categories;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch categories';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createCategory(name: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await CategoryService.create(name);
        this.categories.push(response.category);
        return response;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create category';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateCategory(id: string, name: string) {
      this.loading = true;
      this.error = null;
      try {
        const response = await CategoryService.update(id, name);
        const index = this.categories.findIndex(c => c._id === id);
        if (index !== -1) {
          this.categories[index] = response.category;
        }
        return response;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update category';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteCategory(id: string) {
      this.loading = true;
      this.error = null;
      try {
        await CategoryService.delete(id);
        this.categories = this.categories.filter(c => c._id !== id);
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to delete category';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});