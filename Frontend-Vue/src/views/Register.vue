<template>
  <div>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <form @submit.prevent="handleRegister" class="bg-white p-6 rounded shadow-md w-80">
        <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>

        <div>
          <h3 class="text-base font-bold mb-2">Email</h3>
          <input class="w-full p-2 mb-3 border rounded" type="email" v-model="emailid" placeholder="Enter E-mail" required />
        </div>

        <div>
          <h3 class="text-base font-bold mb-2">Name</h3>
          <input class="w-full p-2 mb-3 border rounded" type="text" v-model="name" placeholder="Enter name" required />
        </div>

        <div>
          <h3 class="text-base font-bold mb-2">Password</h3>
          <input class="w-full p-2 mb-3 border rounded" type="password" v-model="pwd" placeholder="Enter Password" required />
        </div>

        <div>
          <h3 class="text-base font-bold mb-2">Phone number</h3>
          <input class="w-full p-2 mb-3 border rounded" type="text" v-model="phno" placeholder="Enter Phone no." required />
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../stores/auth"
import axios from "axios"
import { useRouter } from "vue-router"

const emailid = ref("")
const name = ref("")
const pwd = ref("")
const phno = ref("")

const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  try {
    const res = await axios.post("http://localhost:3000/auth/register", {
      emailid: emailid.value,
      name: name.value,
      pwd: pwd.value,
      phno: phno.value
    })

    console.log(res.data)
    const { msg, id, name: registeredName } = res.data
    alert(msg) // optional user feedback

    router.push("/dashboard")
  } catch (error) {
    console.error("Register failed!", error)
    alert("Registration failed")
  }
}
</script>
