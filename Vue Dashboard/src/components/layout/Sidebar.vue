<template>
  <aside class="w-64 h-full-screen  bg-gray-800 text-white flex flex-col">
    <!-- Header -->
    <div class="text-2xl font-bold p-4 border-b border-gray-700">
      Ecommerce Dashboard
    </div>

    <!-- Navigation List -->
    <nav class="flex-1">
      <ul class="space-y-2 p-4">
        <li>
          <router-link to="/" class="hover:text-blue-300">
            Login
          </router-link>
        </li>
        <!-- Show only after login -->
        <li v-if="isLoggedIn">
          <router-link to="/dashboard" class="hover:text-blue-300">
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/add-product" class="hover:text-blue-300">
            Add Product
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/products" class="hover:text-blue-300">
            Get Products
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/update/id" class="hover:text-blue-300">
            Update Product
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/delete-product" class="hover:text-blue-300">
            Delete Product
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/user" class="hover:text-blue-300">
            User Details
          </router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/transactions" class="hover:text-blue-300">
            Transaction Details
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { useAuthStore } from '../../stores/auth';
import { computed } from 'vue';

export default {
  setup() {
    const auth = useAuthStore();
    const isLoggedIn = computed(() => !!auth.accessToken);

    return {
      isLoggedIn
    };
  }
};
</script>
