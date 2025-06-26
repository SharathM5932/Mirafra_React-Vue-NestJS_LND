import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginSchemaType } from "../auth/signUpSchema";

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user: {
    email: string;
    username: string;
    role: string;
  };
  token: string;
}

export const signUpAPI = createAsyncThunk<AuthResponse, SignUpCredentials>(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:3000/auth/register",
        credentials
      );

      // If backend returns empty user object, construct it from credentials
      if (!response.data.user || Object.keys(response.data.user).length === 0) {
        return {
          ...response.data,
          user: {
            username: credentials.username,
            email: credentials.email,
            role: "customer", // Add default role if needed
          },
        };
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const signInAPI = createAsyncThunk<AuthResponse, LoginCredentials>(
  "auth/login",
  async (credentials: LoginSchemaType, thunkAPI) => {
    try {
      const response = await axios.post<AuthResponse>(
        "http://localhost:3000/auth/login",
        credentials
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (credentials: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        credentials
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset link"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    credentials: { token: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        credentials
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);