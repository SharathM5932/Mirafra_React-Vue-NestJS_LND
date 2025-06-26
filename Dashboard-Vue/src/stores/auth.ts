import { defineStore } from 'pinia';
import { AuthService } from '@/services/auth.service';
import type { User, LoginData, RegisterData } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(data: LoginData) {
      try {
        const response = await AuthService.login(data);
        this.setAuthData(response);
        return response;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    async register(data: RegisterData) {
      try {
        // Only register, don't automatically login
        const response = await AuthService.register(data);
        // Clear any existing auth data
        this.logout();
        return response;
      } catch (error) {
        this.logout();
        throw error;
      }
    },

    setAuthData(response: { user: User; token: string }) {
      this.user = response.user;
      this.token = response.token;
      this.isAuthenticated = true;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    initialize() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
      }
    },
  },
});