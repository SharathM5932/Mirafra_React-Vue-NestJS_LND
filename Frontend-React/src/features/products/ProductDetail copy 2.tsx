import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addToCart } from '../../features/cart/cartSlice';
import './ProductDetail.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Toast from '../../components/Toast'; // ✅ import toast

interface Product {
  _id: string;
  name: string;
  price: number;
  desc: string;
  pimg: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [toastMsg, setToastMsg] = useState(''); // ✅ for toast
  const dispatch = useDispatch<AppDispatch>();

  const user = JSON.parse(localStorage.getItem('auth') || '{}');
  const userEmail = user?.emailid;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!userEmail) {
      alert('Please login first.');
      return;
    }

    if (!product) return;
    dispatch(
      addToCart({
        uid: userEmail,
        pid: product._id,
        name: product.name,
        price: product.price,
        pimg: product.pimg,
        qty: 1,
      })
    ).then(() => {
      setToastMsg('Product added to cart');
    });
  };

  const handleBuyNow = () => {
    if (!userEmail) {
      alert('Please login first.');
      return;
    }
    setShowPayPal(true);
  };

  const handlePaymentSuccess = (details: any) => {
    alert(`Transaction completed by ${details.payer.name.given_name}`);
    // You can trigger order save to backend here
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <img
        src={`http://localhost:3002/prodimgs/${product.pimg}`}
        className="product-detail-image"
        alt={product.name}
      />
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.desc}</p>
        <h2>₹{product.price}</h2>
        <button className="buy-btn" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button className="buy-btn" onClick={handleBuyNow}>
          Buy now
        </button>

        {showPayPal && (
          <div style={{ marginTop: '20px' }}>
            <PayPalScriptProvider options={{ clientId: 'test', currency: 'USD' }}>
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: 'USD',
                          value: (product.price / 80).toFixed(2), // Approx conversion
                        },
                      },
                    ],
                    intent: 'CAPTURE'
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order?.capture();
                  handlePaymentSuccess(details);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>

      {/* ✅ Show Toast */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
    </div>
  );
};

export default ProductDetail;
