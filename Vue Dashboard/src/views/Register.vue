<template>
  <div>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <form @submit.prevent="handleSignup" class="bg-white p-6 rounded shadow-md w-80">
        <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <div>
          <h3 class="text font-bold mb-2">Name</h3>
          <input
            class="w-full p-2 mb-3 border rounded"
            type="text"
            id="name"
            v-model="name"
            placeholder="Enter Name"
            required
          />
        </div>

        <div>
          <h3 class="text font-bold mb-2">Email</h3>
          <input
            class="w-full p-2 mb-3 border rounded"
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter Email"
            required
          />
        </div>

        <div>
          <h3 class="text font-bold mb-2">Phone Number</h3>
          <input
            class="w-full p-2 mb-3 border rounded"
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div>
          <h3 class="text font-bold mb-2">Password</h3>
          <input
            class="w-full p-2 mb-3 border rounded"
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <div>
          <h3 class="text font-bold mb-2">Confirm Password</h3>
          <input
            class="w-full p-2 mb-3 border rounded"
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  try {
    const response = await axios.post('http://localhost:3000/auth/register', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    })

    const { message, accessToken, user } = response.data
    authStore.setToken(accessToken)
    authStore.setUser(user)
    alert(message)
    router.push('/dashboard')
  } catch (error: any) {
    alert(error.response?.data?.message || 'Signup failed')
  }
}
</script>
