import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axiosInstance";
import axiosInstanceProducts from "../../utils/axiosInstanceProducts";
import type { AuthPayload, AuthState } from "../../types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Storing the local state of the user
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },

    // Storing the local state of the user
    signup: (state, action: PayloadAction<AuthPayload>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },

    // Clearing the token from localstorage, and remove token from the axios header
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;

      localStorage.removeItem("token");
      axiosInstance.defaults.headers.common["x-auth-token"] = null;
      axiosInstanceProducts.defaults.headers.common["x-auth-token"] = null;
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
