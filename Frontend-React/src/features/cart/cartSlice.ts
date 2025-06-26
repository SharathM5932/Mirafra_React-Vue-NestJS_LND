import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem } from '../../types/cart';

const API = 'http://localhost:3004/cart';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (uid: string) => {
    const res = await axios.get<CartItem[]>(`${API}/${uid}`);
    return res.data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload: {
    uid: string;
    pid: string;
    name: string;
    price: number;
    pimg: string;
    qty: number;
  }) => {
    const res = await axios.post(`${API}`, payload);
    return res.data;
  }
);

export const incrementCart = createAsyncThunk(
  'cart/incrementCart',
  async (cid: string) => {
    const res = await axios.patch(`${API}/inc/${cid}`);
    return res.data; // expecting updated item
  }
);

export const decrementCart = createAsyncThunk(
  'cart/decrementCart',
  async (cid: string, { dispatch }) => {
    const res = await axios.patch(`${API}/dec/${cid}`);
    const updated = res.data;

    if (updated.qty <= 0) {
      // Auto-delete if quantity becomes 0
      await dispatch(deleteCartItem(cid));
      return { _id: cid, deleted: true }; // signal for reducer
    }

    return updated;
  }
);


export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (cid: string) => {
    await axios.delete(`${API}/${cid}`);
    return cid;
  }
);

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existingIndex = state.items.findIndex(i => i._id === item._id);
        if (existingIndex !== -1) {
          state.items[existingIndex] = item;
        } else {
          state.items.push(item);
        }
      })
      .addCase(incrementCart.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex(item => item._id === updated._id);
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(decrementCart.fulfilled, (state, action) => {
        const updated = action.payload;

        if (updated.deleted) {
          state.items = state.items.filter(item => item._id !== updated._id);
        } else {
          const index = state.items.findIndex(item => item._id === updated._id);
          if (index !== -1) {
            state.items[index] = updated;
          }
        }
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  }
});

export default cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
