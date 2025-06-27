<template>
  <div class="p-6 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <h2 class="text-2xl font-bold mb-6">Settings</h2>
     
    <div class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <button
        @click="toggleTheme"
        class="px-4 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {{ isDark ? 'Switch to Light' : 'Switch to Dark' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>
