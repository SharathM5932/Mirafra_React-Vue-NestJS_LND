// src/stores/userStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';

export interface User {
  _id: string;
  emailid: string;
  name: string;
  phno: string;
  pwd: string;
  role: string;
}

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const res = await axios.get<User[]>('http://localhost:3001/users/getAll');
        this.users = res.data;
        this.error = null;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch users';
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(id: string) {
      await axios.delete(`http://localhost:3001/users/${id}`);
      this.users = this.users.filter(u => u._id !== id);
    },
    async updateUser(id: string, updatedData: Partial<User>) {
      const res = await axios.patch(`http://localhost:3001/users/${id}`, updatedData);
      const index = this.users.findIndex(u => u._id === id);
      if (index !== -1) this.users[index] = res.data;
    }
  }
});
