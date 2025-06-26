import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import paymentReducer from "../features/payment/paymentSlice"
// Set's up the central redux store.
// Registering our authSlice inside configureStore from redux
export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        payment :paymentReducer
    },
});


// Data flow for storing in global store
// Dispatch ==> Action (with | without payload) ==> Reducer ==> Store
// For data retrival
// Directly from the store using the key in the reducer (eg. auth is the key here)

// Provides strong types for RootState
export type RootState = ReturnType<typeof store.getState>;
// For dispatch type and payload.
export type AppDispatch = typeof store.dispatch;
