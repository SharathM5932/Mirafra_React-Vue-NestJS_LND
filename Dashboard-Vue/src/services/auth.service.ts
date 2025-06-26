import api from './api';
import type { LoginData, RegisterData, AuthResponse } from '@/types/auth';

export const AuthService = {
  /**
   * Login user with email and password
   * @param data Login credentials
   * @returns Promise with auth response
   */
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', data);
      
      if (!response.data.user || !response.data.token) {
        throw new Error('Invalid response from server');
      }

      return {
        message: response.data.message || 'Login successful',
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  },

  /**
   * Register new user
   * @param data Registration data
   * @returns Promise with auth response
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', data);
      
      if (!response.data.message) {
        throw new Error('Invalid response from server');
      }

      return {
        message: response.data.message,
        user: response.data.user || null,
        token: response.data.token || null,
      };
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      // Handle different error responses
      if (error.response?.data?.errors) {
        // Handle validation errors
        const errorMessages = Object.values(error.response.data.errors).join(', ');
        throw new Error(errorMessages);
      }
      
      throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  },

  /**
   * Validate current token (if exists)
   * @returns Promise with validation result
   */
  async validateToken(): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      // You might want to implement a token validation endpoint
      // const response = await api.get('/auth/validate');
      // return response.data.valid;
      
      // For now, just check if token exists
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }
};