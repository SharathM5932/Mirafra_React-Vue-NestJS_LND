// stores/paymentStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    transactions: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async getTransactions() {
      this.loading = true;
      this.error = null;

      try {
        // Replace with your real backend URL (API Gateway / Transaction Microservice)
        const response = await axios.get('http://localhost:4005/transactions');
        console.log(response)
        this.transactions = response.data;
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch transactions';
      } finally {
        this.loading = false;
      }
    },
  },
});
