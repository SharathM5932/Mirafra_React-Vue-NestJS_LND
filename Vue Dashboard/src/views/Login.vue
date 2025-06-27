<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow-md w-80">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <div>
        <label class="block font-bold mb-1" for="email">Email</label>
        <input class="w-full p-2 mb-3 border rounded" type="email" id="email" v-model="email" placeholder="Enter E-mail"
          required />
      </div>

      <div>
        <label class="block font-bold mb-1" for="password">Password</label>
        <input class="w-full p-2 mb-3 border rounded" type="password" id="password" v-model="password"
          placeholder="Enter Password" required />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const email = ref("")
const password = ref("")
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {

  if (!email.value || !password.value) {
    toast.warning('Please enter both email and password', { autoClose: 2000 })
    return
  }

  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value
    })

    const { accessToken, user, message } = response.data

    authStore.setToken(accessToken)
    authStore.setUser(response.data)
    localStorage.setItem('token', accessToken)
    toast.success(message || 'Login successful!')
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Login failed', { autoClose: 2500 })
  }
}

</script>
