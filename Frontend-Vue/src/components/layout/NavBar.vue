<template>
  <header class="h-16 bg-white shadow-md px-6 flex items-center justify-between">
    <h1 class="text-xl font-semibold">
      My Admin Panel
    </h1>
    <div class="relative" ref="dropdownRef">
      <button @click="toggleDropdown" v-if="auth.token">
        <!-- <img src="https://i.pravatar.cc/40" alt="profile" class="w-10 h-10 rounded-full border" /> -->
        <img src="https://img.freepik.com/free-vector/business-user-shield_78370-7029.jpg" alt="profile" class="w-10 h-10 rounded-full border" />
      </button>

      <!-- Dropdown -->
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
        <ul>
          <li><button @click="setting" class="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button></li>
          <li><button @click="helpfaq" class="w-full text-left px-4 py-2 hover:bg-gray-100">Help & FAQ</button></li>
          <li><button @click="releasenotes" class="w-full text-left px-4 py-2 hover:bg-gray-100">Release Notes</button></li>
          <li><button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button></li>
        </ul>
      </div>
    </div>
  </header>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const dropdownOpen = ref(false)
const auth = useAuthStore()
const router = useRouter()

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const logout = () => {
  dropdownOpen.value = false
  auth.logout()
  router.push('/login')
}

const helpfaq = () => {
  dropdownOpen.value = false
  router.push('/helpfaq')
}

const releasenotes = () => {
  dropdownOpen.value = false
  router.push('/releasenotes')
}

const setting = () => {
  dropdownOpen.value = false
  router.push('/setting')
}

const dropdownRef = ref(null)
onClickOutside(dropdownRef, () => {
  dropdownOpen.value = false
})
</script>

<style scoped>
/* Optional styling */
</style>
