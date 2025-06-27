import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  setCartItems,
  getCartFromLocalStorage,
} from "./CartSlice";
import "../../styles/CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const email = useSelector((state: RootState) => state.auth.email);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedItems = getCartFromLocalStorage(email || null);
    dispatch(setCartItems(storedItems));
  }, [dispatch, email]);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart({ email: email || null, itemId: id }));
  };

  const handleClear = () => {
    dispatch(clearCart({ email: email || null }));
  };

  const handleIncrease = (id: string) => {
    dispatch(increaseQuantity({ email: email || null, itemId: id }));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity({ email: email || null, itemId: id }));
  };

  const handleCheckout = () => {
    if (!email) {
      navigate("/login");
      return;
    }
    navigate("/payment");
  };


  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={`http://localhost:3002/${item.image}`} alt={item.name} className="cart-item-image" />
                <div className="cart-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item._id)} className="qty-btn">-</button>
                    <span>{item.quantity} kg</span>
                    <button onClick={() => handleIncrease(item._id)} className="qty-btn">+</button>
                  </div>
                  <p className="cart-item-total">
                    Total: ₹{item.quantity * item.price}
                  </p>
                  <button onClick={() => handleRemove(item._id)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="buttons">
            <button onClick={handleClear} className="back-btn">
              Clear Cart
            </button>
            <button onClick={handleCheckout} className="order-btn">
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
