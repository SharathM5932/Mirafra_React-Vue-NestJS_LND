<template>
  <aside class="w-64 h-screen fixed bg-gray-800 text-white flex flex-col">
    <div class="text-2xl font-bold p-6 border-b border-gray-700">
      Dashboard
    </div>
    <nav class="flex-1 p-4 overflow-y-auto">
      <ul class="space-y-4">
        <li>
          <router-link to="/" class="block hover:text-blue-300">
            Login
          </router-link>
        </li>

        <!-- Show only if logged in -->
        <li v-if="isLoggedIn">
          <router-link to="/dashboard" class="block hover:text-blue-300">
            Dashboard
          </router-link>
        </li>

        <li v-if="isLoggedIn">
          <router-link to="/addproducts" class="block hover:text-blue-300">
            Add Products
          </router-link>
        </li>

        <li v-if="isLoggedIn">
          <router-link to="/allproducts" class="block hover:text-blue-300">
            All Products
          </router-link>
        </li>

        <li v-if="isLoggedIn">
          <router-link to="/user" class="block hover:text-blue-300">
            User Details
          </router-link>
        </li>

        <li v-if="isLoggedIn">
          <router-link to="/transaction" class="block hover:text-blue-300">
            All Transactions
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../store/auth'
import { computed } from 'vue'

const auth = useAuthStore()
const isLoggedIn = computed(() => !!auth.token)
</script>
