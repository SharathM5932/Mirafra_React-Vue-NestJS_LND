import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";
import "./cart.css";
import { Category } from "../types";

const Cart = () => {
  const { 
    cartItems, 
    updateCartItem, 
    removeFromCart, 
    cartTotal,
  } = useContext(AppContext);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    setIsRemoving(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setIsRemoving(null);
    }, 300);
  };

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        cartItems: [...cartItems],
        cartTotal: calculateTotal()
      }
    });
  };

  const cartItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.3 },
    },
  };

  const getCategoryName = (category: string | Category) => {
    if (typeof category === 'string') {
      return category;
    }
    return category.name;
  };

  return (
    <div className="qb-cart-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="qb-cart-title"
      >
        Your Shopping Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="qb-empty-cart"
        >
          <div className="qb-empty-icon">
            <FiShoppingBag size={48} />
          </div>
          <h3 className="qb-empty-title">Your cart is empty</h3>
          <p className="qb-empty-text">
            Start shopping to add items to your cart
          </p>
          <Link to="/products" className="qb-empty-btn">
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <div className="qb-cart-grid">
          <div className="qb-cart-items">
            <div className="qb-cart-header">
              <div className="qb-header-product">Product</div>
              <div className="qb-header-price">Price</div>
              <div className="qb-header-quantity">Quantity</div>
              <div className="qb-header-total">Total</div>
              <div className="qb-header-actions"></div>
            </div>

            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={cartItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className={`qb-cart-item ${
                    isRemoving === item._id ? "qb-removing" : ""
                  }`}
                >
                  <div className="qb-item-product">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="qb-item-image"
                    />
                    <div className="qb-item-details">
                      <h3 className="qb-item-title">{item.title}</h3>
                      <p className="qb-item-category">
                        {getCategoryName(item.category)}
                      </p>
                    </div>
                  </div>
                  <div className="qb-item-price">${item.price.toFixed(2)}</div>
                  <div className="qb-item-quantity">
                    <button
                      className="qb-quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="qb-quantity-value">{item.quantity}</span>
                    <button
                      className="qb-quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                  <div className="qb-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="qb-item-actions">
                    <button
                      className="qb-remove-btn"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="qb-cart-summary"
          >
            <h3 className="qb-summary-title">Order Summary</h3>
            <div className="qb-summary-details">
              <div className="qb-summary-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="qb-summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="qb-summary-row qb-total-row">
                <span>Total</span>
                <span className="qb-total-amount">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              className="qb-checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="qb-continue-link">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;