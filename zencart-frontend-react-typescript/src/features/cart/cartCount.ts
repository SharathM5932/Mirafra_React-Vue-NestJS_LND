import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { CartCountState } from "../../types/cart";

const initialState: CartCountState = {
  cartCount: 0,
};

// for managing the cart state/ count
const cartCountSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
  },
});

export const { setCartCount } = cartCountSlice.actions;
export default cartCountSlice.reducer;
