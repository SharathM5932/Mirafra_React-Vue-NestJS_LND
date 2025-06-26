import { Key } from "react";

export interface Category {
  _id: string;
  name: string;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id?: Key | null | undefined;
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string | Category;
  image: string;
  rating?: Rating;
  createdAt?: string;
  updatedAt?: string;
  quantity?: number; // Added for cart items
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateCartItem: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartItemsCount: number;
  cartTotal: number;
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}