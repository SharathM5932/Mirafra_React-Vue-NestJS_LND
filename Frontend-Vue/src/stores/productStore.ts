import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await axios.get<Product[]>('http://localhost:3002/products');
        this.products = res.data;
        this.error = null;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch products';
      } finally {
        this.loading = false;
      }
    },
    async deleteProduct(id: string) {
      try {
        await axios.delete(`http://localhost:3002/products/${id}`);
      } catch (error) {
        throw new Error('Failed to delete product');
      }
    }
  },
});
interface Product {
  _id: string;
  name: string;
  desc: string;
  price: number;
  cat: string;
  pimg?: string;
}