import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './TransactionPage.css';

interface Transaction {
  id: string;
  status: string;
  payer?: { payer_id: string };
  create_time: string;
}

const TransactionPage: React.FC = () => {
  const emailid = useSelector((state: RootState) => state.auth.emailid);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // const stored = JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[];
    const stored = JSON.parse(sessionStorage.getItem('transactions') || '[]') as Transaction[];
    setTransactions(stored);
  }, []);

  return (
    <div className="transaction-page">
      <h2 className="transaction-heading">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Payer ID</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td className={tx.status}>{tx.status}</td>
                  <td>{tx.payer?.payer_id || 'N/A'}</td>
                  <td>{new Date(tx.create_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
