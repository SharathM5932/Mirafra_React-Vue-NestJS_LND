import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Product, CartItem, AppContextType } from "./types";

// Local storage keys
const CART_STORAGE_KEY = 'quickbasket_cart';
const WISHLIST_STORAGE_KEY = 'quickbasket_wishlist';

export const AppContext = createContext<AppContextType>({
  cartItems: [],
  addToCart: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
  wishlistItems: [],
  addToWishlist: () => {},
  isInWishlist: () => false,
});

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize cart from localStorage
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    // Initialize wishlist from localStorage
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateCartItem = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      const isAlreadyInWishlist = prevItems.some(
        (item) => item._id === product._id
      );
      if (isAlreadyInWishlist) {
        return prevItems.filter((item) => item._id !== product._id);
      }
      return [...prevItems, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartItemsCount,
        cartTotal,
        wishlistItems,
        addToWishlist,
        isInWishlist,
      }}
    >
      <div className="app min-h-screen flex flex-col">
        <Navbar />
        <main className="main-content flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;