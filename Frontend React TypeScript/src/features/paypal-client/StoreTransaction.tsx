import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { clearCart } from '../cart/CartSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreTransaction: React.FC = () => {
    const [currency, setCurrency] = useState('USD');
    const email = useSelector((state: RootState) => state.auth.email);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalAmount = cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);

    const handleApprove = async (data: any, actions: any) => {
        try {
            const details = await actions.order.capture();

            const transactionPayload = {
                transactionId: details.id,
                payerEmail: details.payer.email_address,
                amount: details.purchase_units[0].amount.value,
                date: new Date().toISOString(),
            };

            const response = await fetch('http://localhost:3004/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transactionPayload),
            });

            if (response.ok) {
                dispatch(clearCart({ email })); // Clear cart after successful transaction
                toast.success('Order Placed successfully!');
                navigate('/transactions');
            } else {
                const error = await response.text();
                toast.error('Failed to store transaction: ' + error);
            }
        } catch (error) {
            toast.error('Payment approval failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId:
                    'AcEpwCsIyg9uBsRVY04DOVtMqQGZ7cNjuwBeON-gLSROFgT_V5sMdJLstzBQUwe0QUsETTZ73rBHX7z1',
            }}
        >
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    padding: '20px',
                }}
            >
                <h2>Make Payment</h2>
                <p>Total: ${totalAmount}</p>
                <div style={{ maxWidth: '400px', width: '100%' }}>
                    <PayPalButtons
                        style={{ layout: 'vertical' }}
                        createOrder={(data, actions) =>
                            actions.order.create({
                                intent: 'CAPTURE',
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: `${totalAmount}`,
                                        },
                                    },
                                ],
                            })
                        }
                        onApprove={handleApprove}
                    />
                </div>

                {/* ToastContainer placed here to show toasts in this component */}
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default StoreTransaction;
