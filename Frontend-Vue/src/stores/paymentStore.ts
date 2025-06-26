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
                // const res = await axios.get('http://localhost:3005/payment');
                const res = await axios.get('http://localhost:3005/payment/allTransactions');
                const raw = res.data;

                // Flatten transactions from all users
                this.transactions = raw.flatMap((record: any) =>
                    record.transactions.map((txn: any) => ({
                        ...txn,
                        emailid: record.emailid, // keep track of who made the transaction
                    }))
                );
            } catch (err: any) {
                this.error = 'Failed to load transactions';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
    async fetchTransactions(emailid: string) {
            this.loading = true;
            this.error = null;
            try {
                const res = await axios.get(`http://localhost:3005/payment/allTransactions/${emailid}`);
                this.transactions = res.data?.transactions || [];
            } catch (err: any) {
                this.error = 'Failed to load transactions';
                console.error(err);
            } finally {
                this.loading = false;
            }
        },
    },
});
