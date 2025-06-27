import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const getEmailKey = (email: string | null): string => email || "guest";

export const getCartFromLocalStorage = (email: string | null): CartItem[] => {
  const key = getEmailKey(email);
  try {
    const cartData = localStorage.getItem(`cart_${key}`);
    return cartData ? JSON.parse(cartData) : [];
  } catch {
    return [];
  }
};

export const setCartToLocalStorage = (email: string | null, cartItems: CartItem[]): void => {
  const key = getEmailKey(email);
  localStorage.setItem(`cart_${key}`, JSON.stringify(cartItems));
};

export const clearCartFromLocalStorage = (email: string | null): void => {
  const key = getEmailKey(email);
  localStorage.removeItem(`cart_${key}`);
};


export const mergeGuestCartWithUserCart = createAsyncThunk(
  'cart/mergeGuestCart',
  async ({ email, guestCart }: { email: string; guestCart: CartItem[] }, thunkAPI) => {
    const userCart = getCartFromLocalStorage(email);

    const map = new Map<string, CartItem>();

    // Add existing user cart
    userCart.forEach(item => map.set(item._id, { ...item }));

    // Merge guest cart
    guestCart.forEach(item => {
      if (map.has(item._id)) {
        const existing = map.get(item._id)!;
        existing.quantity += item.quantity;
        map.set(item._id, existing);
      } else {
        map.set(item._id, { ...item });
      }
    });

    const mergedCart = Array.from(map.values());

    setCartToLocalStorage(email, mergedCart);

    return mergedCart;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ email: string | null; item: CartItem }>) {
      const { email, item } = action.payload;
      const existing = state.items.find((i) => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      setCartToLocalStorage(email, state.items);
    },

    removeFromCart(state, action: PayloadAction<{ email: string | null; itemId: string }>) {
      state.items = state.items.filter((item) => item._id !== action.payload.itemId);
      setCartToLocalStorage(action.payload.email, state.items);
    },

    increaseQuantity(state, action: PayloadAction<{ email: string | null; itemId: string }>) {
      const item = state.items.find((i) => i._id === action.payload.itemId);
      if (item) {
        item.quantity += 1;
        setCartToLocalStorage(action.payload.email, state.items);
      }
    },

    decreaseQuantity(state, action: PayloadAction<{ email: string | null; itemId: string }>) {
      const item = state.items.find((i) => i._id === action.payload.itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        setCartToLocalStorage(action.payload.email, state.items);
      }
    },

    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    clearCart(state, action: PayloadAction<{ email: string | null }>) {
      state.items = [];
      clearCartFromLocalStorage(action.payload.email);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(mergeGuestCartWithUserCart.fulfilled, (state, action) => {
      state.items = action.payload;
      localStorage.removeItem("cart_guest");
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCartItems,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
