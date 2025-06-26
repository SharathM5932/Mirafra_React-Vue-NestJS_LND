import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import userRoleReducer from "../features/user/userRoleSlice";
import userReducer from "../features/user/userSlice";
import cartCountReducer from "../features/cart/cartCount";

// Centralized stores for all reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    userRole: userRoleReducer,
    user: userReducer,
    cartCount: cartCountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
