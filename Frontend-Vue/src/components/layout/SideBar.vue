<template>
  <aside class="w-60 h-auto bg-gray-800 text-white flex flex-col">
    <div class="text-2xl font-bold p-6 border-b border-gray-700">
      <router-link to="/dashboard">
        Dashboard
      </router-link>
    </div>
    <nav class="flex-1 p-4">
      <ul class="space-y-4">
        <li v-if="isnotLoggedIn">
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
        <li>
          <router-link v-if="isLoggedIn" to="/allproducts" class="block hover:text-blue-300">
            All Products
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/addproducts" class="block hover:text-blue-300">
            Add Products
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/userlist" class="block hover:text-blue-300">
            All users
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/alltransactions" class="block hover:text-blue-300">
            All Transactions
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';
import { computed } from 'vue';

const auth = useAuthStore()
const isLoggedIn = computed(() => !!auth.token)
const isnotLoggedIn = computed(() => !auth.token)

</script>