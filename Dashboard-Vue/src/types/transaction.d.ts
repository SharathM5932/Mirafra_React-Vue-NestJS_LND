export interface CreatePaymentDto {
  emailid: string;
  transaction: Transaction;
}

export interface Transaction {
  orderId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  date: string;
  paymentMethod?: string;
  customerEmail?: string;
}

export interface PaymentRecord {
  _id: string;
  emailid: string;
  transactions: Transaction[];
  __v?: number;
}