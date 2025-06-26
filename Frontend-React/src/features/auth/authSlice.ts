import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpAPI, signInAPI, forgotPassword, resetPassword } from "../api/authApi";

interface ErrorPayload {
  message?: string;
  error?: string;
  statusCode?: number;
}

type RejectedAction = ReturnType<
  typeof signInAPI.rejected | typeof signUpAPI.rejected
>;

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  email: string | null;
  role: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  token: null,
  loading: false,
  error: null,
  message: null,
  email: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.token = null;
      state.email = null;
      state.role = null;
      state.message = null;
      state.error = null;
    },
    clearAuthMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        signInAPI.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            user: { email: string; username: string; role: string };
            token: string;
          }>
        ) => {
          state.loading = false;
          state.email = action.payload.user.email;
          state.isAuthenticated = true;
          state.username = action.payload.user.username;
          state.token = action.payload.token;
          state.message = action.payload.message;
          state.role = action.payload.user.role;
          state.error = null;
        }
      )
      .addCase(signInAPI.rejected, (state, action: RejectedAction) => {
        state.loading = false;
        state.isAuthenticated = false;
        const payload = action.payload as ErrorPayload | undefined;
        state.error =
          payload?.message || action.error.message || "Login failed";
        state.message = null;
      })

      // Sign Up - Modified to not authenticate automatically
      .addCase(signUpAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        signUpAPI.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            user: { username: string; email: string };
          }>
        ) => {
          state.loading = false;
          state.username = action.payload.user.username;
          state.email = action.payload.user.email;
          state.message = action.payload.message;
          state.token = null; // Explicitly set to null
          state.isAuthenticated = false; // Explicitly set to false
          state.error = null;
        }
      )
      .addCase(signUpAPI.rejected, (state, action: RejectedAction) => {
        state.loading = false;
        const payload = action.payload as ErrorPayload | undefined;
        state.error =
          payload?.message || action.error.message || "Signup failed";
        state.message = null;
      })

      // Password Reset
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.message = action.payload.message;
          state.error = null;
        }
      )
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as ErrorPayload | undefined;
        state.error =
          payload?.message || action.error.message || "Failed to send reset link";
        state.message = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.message = action.payload.message;
          state.error = null;
        }
      )
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as ErrorPayload | undefined;
        state.error =
          payload?.message || action.error.message || "Failed to reset password";
        state.message = null;
      });
  },
});

export const { signOut, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;