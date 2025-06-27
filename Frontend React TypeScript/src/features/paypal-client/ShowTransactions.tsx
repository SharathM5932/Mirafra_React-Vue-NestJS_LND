import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/ShowTransactions.css';

interface Transaction {
  transactionId: string;
  payerEmail: string;
  amount: string;
  date: string;
}

const ShowTransactions: React.FC = () => {
  const [latestTransaction, setLatestTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3004/transactions')
      .then((res) => res.json())
      .then((transactions: Transaction[]) => {
        if (transactions.length > 0) {
          const sorted = transactions.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setLatestTransaction(sorted[0]);
          toast.success('Order Placed successfully!');
        } else {
          toast.info('No transactions found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Failed to load transactions.');
        setLoading(false);
        console.error(error);
      });
  }, []);

  if (loading) {
    return <p className="show-transactions__loading">Loading latest transaction...</p>;
  }

  if (!latestTransaction) {
    return <p className="show-transactions__loading">No transactions found.</p>;
  }

  return (
    <div className="show-transactions__container">
      <h2 className="show-transactions__heading">Transaction Details</h2>
      <div className="show-transactions__single-transaction">
        <p><strong>Transaction ID:</strong> {latestTransaction.transactionId}</p>
        <p><strong>Email:</strong> {latestTransaction.payerEmail}</p>
        <p><strong>Amount:</strong> ${latestTransaction.amount}</p>
        <p><strong>Date:</strong> {new Date(latestTransaction.date).toLocaleString()}</p>
      </div>
      <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ShowTransactions;
