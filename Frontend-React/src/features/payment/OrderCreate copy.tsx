import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { useNavigate, useLocation } from 'react-router-dom';
// import { clearCart } from '../cart/cartSlice';
import './OrderCreate.css';
import { clearCart } from '../cart/cartSlice';

const OrderCreate: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const transaction = location.state?.transaction;

  useEffect(() => {
    if (!transaction) {
      navigate('/'); // Redirect to home if no transaction
    } else {
      dispatch(clearCart()); // Clear cart after payment success
    }
  }, [dispatch, navigate, transaction]);

  const navi =useNavigate()
  const back = ()=>{
    navi("/")
  if (!transaction) return null;
  }
  return (
    <div className="order-container">
      <h2 className="order-title">Order Confirmation</h2>
      <p>Thank you for your purchase!</p>
      <div className="order-details">
        <p><strong>Transaction ID:</strong> {transaction.id}</p>
        <p><strong>Status:</strong> {transaction.status}</p>
        <p><strong>Paid By:</strong> {transaction.payer?.payer_id}</p>
        <p><strong>Time:</strong> {new Date(transaction.create_time).toLocaleString()}</p>
      </div>
      <button onClick={back} className='button'>Go back</button>
    </div>
  );
};

export default OrderCreate;
