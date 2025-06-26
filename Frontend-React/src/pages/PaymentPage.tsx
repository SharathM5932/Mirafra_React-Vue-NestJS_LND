import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import type { ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiShoppingBag,
  FiAlertCircle,
} from "react-icons/fi";
import "./payment.css";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("user@example.com"); // Replace with actual user email from auth

  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
      setCartTotal(
        location.state.cartTotal || calculateTotal(location.state.cartItems)
      );
    } else {
      navigate("/cart", { replace: true });
    }
  }, [location.state, navigate]);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const savePaymentToBackend = async (orderId: string) => {
    try {
      const paymentData = {
        emailid: userEmail,
        transaction: {
          orderId,
          amount: cartTotal,
          status: "success",
          date: new Date().toISOString(),
          items: cartItems.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category
          }))
        },
      };

      const response = await fetch("http://localhost:3010/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to save payment data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error saving payment:", error);
      throw error;
    }
  };

  const handlePaymentSuccess = async (orderId: string) => {
    setPaymentProcessing(true);
    try {
      await savePaymentToBackend(orderId);
      
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate("/orders", {
          state: {
            cartItems,
            cartTotal,
            paymentDate: new Date().toISOString(),
            paymentMethod: "PayPal",
            orderId,
          },
          replace: true,
        });
      }, 2000);
    } catch (error) {
      setPaypalError("Payment was successful but failed to save record. Please contact support.");
      setPaymentProcessing(false);
    }
  };

  const handleCreateOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: cartTotal.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cartTotal.toFixed(2),
              },
            },
          },
          items: cartItems.map((item) => ({
            name: item.title.substring(0, 127),
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
            category: "PHYSICAL_GOODS",
          })),
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    });
  };

  const handleApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      handlePaymentSuccess(details.id);
    });
  };

  const handleError = (err: any) => {
    console.error("PayPal error:", err);
    setPaypalError(
      err.message || "Payment processing failed. Please try again."
    );
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="qb-payment-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="qb-payment-header"
      >
        <button className="qb-back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft size={20} />
          Back to Cart
        </button>
        <h1 className="qb-payment-title">Complete Your Purchase</h1>
        <div className="qb-payment-steps">
          <div className="qb-step completed">
            <span>1</span>
            <p>Cart</p>
          </div>
          <div className="qb-step active">
            <span>2</span>
            <p>Payment</p>
          </div>
          <div className="qb-step">
            <span>3</span>
            <p>Confirmation</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="qb-payment-success-overlay"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="qb-success-icon"
            >
              <FiCheck size={64} />
            </motion.div>
            <h2>Payment Successful!</h2>
            <p>Your order is being processed...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="qb-payment-grid">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="qb-payment-methods"
        >
          <div className="qb-payment-card">
            <div className="qb-payment-method-header">
              <FiCreditCard size={24} />
              <h3>Payment Method</h3>
            </div>

            <div className="qb-payment-security">
              <FiLock size={16} />
              <span>Secure Payment</span>
            </div>

            {paymentProcessing ? (
              <div className="qb-payment-processing">
                <div className="qb-processing-spinner"></div>
                <p>Processing your payment...</p>
              </div>
            ) : (
              <>
                {paypalError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="qb-paypal-error"
                  >
                    <FiAlertCircle size={20} />
                    <p>{paypalError}</p>
                    <button
                      onClick={() => {
                        setPaypalError(null);
                        window.location.reload();
                      }}
                    >
                      Retry Payment
                    </button>
                  </motion.div>
                )}
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 48,
                  }}
                  createOrder={handleCreateOrder}
                  onApprove={handleApprove}
                  onError={handleError}
                  onCancel={() =>
                    setPaypalError("Payment was canceled by user")
                  }
                />
              </>
            )}
          </div>

          <div className="qb-payment-security-info">
            <FiLock size={20} />
            <div>
              <h4>Secure Payment</h4>
              <p>
                Your payment information is processed securely through PayPal.
                We do not store any payment details on our servers.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="qb-order-summary"
        >
          <div className="qb-summary-card">
            <h3 className="qb-summary-title">
              <FiShoppingBag size={20} />
              Order Summary
            </h3>

            <div className="qb-order-items">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className="qb-order-item"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="qb-order-item-image"
                  />
                  <div className="qb-order-item-details">
                    <h4>
                      {item.title.substring(0, 50)}
                      {item.title.length > 50 ? "..." : ""}
                    </h4>
                    <p>
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    <span className="qb-item-category">{item.category}</span>
                  </div>
                  <div className="qb-order-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="qb-order-totals">
              <div className="qb-total-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="qb-total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="qb-total-row">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="qb-total-row qb-grand-total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="qb-customer-support">
            <h4>Need Help?</h4>
            <p>
              Contact our customer support for assistance with your order or
              payment issues.
            </p>
            <a href="mailto:support@example.com" className="qb-support-link">
              support@example.com
            </a>
            <p className="qb-support-phone">+1 (555) 123-4567</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;