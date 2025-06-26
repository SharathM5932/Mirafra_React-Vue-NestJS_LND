import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PaymentRecord, Transaction } from '@/types/transaction';
import TransactionService from '@/services/transaction.service';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref<PaymentRecord[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchTransactions = async () => {
    try {
      loading.value = true;
      transactions.value = await TransactionService.getAllTransactions();
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch transactions';
      console.error('Error fetching transactions:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchTransactionsByEmail = async (email: string) => {
    try {
      loading.value = true;
      const result = await TransactionService.getTransactionsByEmail(email);
      if (result) {
        transactions.value = [result];
      } else {
        transactions.value = [];
      }
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch transactions by email';
      console.error('Error fetching transactions by email:', err);
    } finally {
      loading.value = false;
    }
  };

  const addTransaction = async (transaction: Transaction, email: string) => {
    try {
      loading.value = true;
      await TransactionService.addTransaction({ emailid: email, transaction });
      await fetchTransactions();
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add transaction';
      console.error('Error adding transaction:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    fetchTransactionsByEmail,
    addTransaction,
  };
});