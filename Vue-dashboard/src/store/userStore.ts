import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as { Name: string; Email: string; role: string }[],
    loading: false,
    error: '',
  }),
  actions: {
    async fetchUsers() {
      this.loading = true
      
      try {
        const res = await axios.get('http://localhost:3001/user')
        this.users = res.data
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Failed to fetch users'
      } finally {
        this.loading = false
      }
    },
  },
})
