<template>
  <div class="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
    <div class="p-6 border-b border-gray-700">
      <h1 class="text-xl font-bold">Admin Dashboard</h1>
    </div>

    <nav class="flex-1 px-4 py-6 space-y-2">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
        :class="{ 'bg-gray-800 text-white': $route.path === item.path }"
      >
        <component :is="item.icon" class="w-5 h-5 mr-3" />
        {{ item.name }}
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Users",
    path: "/users",
    icon: UsersIcon,
  },
  {
    name: "Products",
    path: "/products",
    icon: ShoppingBagIcon,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: CurrencyDollarIcon,
  },
];
</script>
