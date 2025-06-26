<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow-md w-80">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <div>
        <h3 class="text-base font-bold mb-1">Email</h3>
        <input class="w-full p-2 mb-3 border rounded" type="email" id="email" v-model="emailid"
          placeholder="Enter E-mail" required />
      </div>

      <div>
        <h3 class="text-base font-bold mb-1">Password</h3>
        <input class="w-full p-2 mb-3 border rounded" type="password" id="password" v-model="pwd"
          placeholder="Enter Password" required />
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useAuthStore } from "../stores/auth"
import axios from "axios"
import { useRouter } from "vue-router"
import { onMounted, onUpdated, onUnmounted } from "vue"


const emailid = ref("")
const pwd = ref("")

const router = useRouter()
const authStore = useAuthStore()

// // watch for changes to email
// watch(emailid, (newval, oldval) => {
//   console.log(`email changed from ${oldval} to ${newval}`)
// })

// onMounted(() => {
//   console.log("component mounted")
// })

// onUpdated(() => {
//   console.log("component updated")
// })

// onUnmounted(() => {
//   console.log("component destroyed")
// })

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:3000/auth/login", {
      emailid: emailid.value,
      pwd: pwd.value
    })

    console.log(res)

    const { msg, _id, email, name, role, token } = res.data
    authStore.setToken(token)
    const user = { msg, _id, email, name, role, token }
    authStore.setUser(user)

    router.push("/dashboard")
  } catch (error) {
    console.error("Login failed!", error)
    alert("Invalid credentials")
  }
}
</script>