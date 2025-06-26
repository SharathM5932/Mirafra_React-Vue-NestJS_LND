// This file is part of the Vue.js application.
// It defines a Pinia store for managing authentication state.
import { defineStore } from "pinia";
// Importing Pinia's defineStore function to create a store
// Defining the initial state of the store
// The store is used to manage authentication state in the application.
// The state contains two properties:
// - token: a string that holds the authentication token
// - user: an object that holds user information or null if not authenticated
export const useAuthStore = defineStore('auth', {// Defining a new store named 'auth'
    state: () => ({
        token: "",
        user: null as null | {
            msg: string,
            _id: string,
            email: string,
            name: string,
            role: string,
            token: string,
        }
    }),

    actions: {
        setToken(token: string) {
            this.token = token;
        },

        setUser(user: { msg: string, _id: string, email: string, name: string, role: string, token: string }) {
            this.user = user;
            localStorage.setItem('auth', JSON.stringify(user));
        },

        logout() {
            this.token = "";
            this.user = null;
            localStorage.removeItem('auth');
        },
        
        loadUserFromStorage() {
            const saved = localStorage.getItem('auth');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.user = parsed;
                this.token = parsed.token;
            }
        }
    }
})