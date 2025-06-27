import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    user: null as null | {
      message: string,
      accessToken: string,
      user: {
        name: string,
        email: string,
        role: string
      }
    }
  }),

  actions: {
    setToken(accessToken: string) {
      this.accessToken = accessToken;
    },

    setUser(user: {
      message: string;
      accessToken: string;
      user: { name: string; email: string; role: string };
    }) {
      this.user = user;
    },

    logout() {
      this.accessToken = '';
      this.user = null;
    }
  }
});
