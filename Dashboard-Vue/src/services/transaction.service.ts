import type { CreatePaymentDto, PaymentRecord, Transaction } from '@/types/transaction';

const API_URL = 'http://localhost:3010/payment';

export default {
  async getAllTransactions(): Promise<PaymentRecord[]> {
    const response = await fetch(`${API_URL}/allTransactions`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return await response.json();
  },

  async getTransactionsByEmail(email: string): Promise<PaymentRecord | null> {
    const response = await fetch(`${API_URL}/${email}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch transactions by email');
    }
    return await response.json();
  },

  async addTransaction(dto: CreatePaymentDto): Promise<PaymentRecord> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) {
      throw new Error('Failed to add transaction');
    }
    return await response.json();
  },
};