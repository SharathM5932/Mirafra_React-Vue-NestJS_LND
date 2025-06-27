import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],  // <-- type here
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
  },
});
interface Product {
  _id: string;
  name: string;
  desc: string;
  price: number;
  cat: string;
  brand: string;
  color:string;
  pimg?: string;
}