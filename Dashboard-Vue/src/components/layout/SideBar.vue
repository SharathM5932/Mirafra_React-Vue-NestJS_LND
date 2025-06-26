<template>
  <aside
    class="sidebar fixed top-0 left-0 bottom-0 w-64 bg-white text-gray-800 shadow-lg transform -translate-x-full md:translate-x-0 z-20 border-r border-gray-100"
  >
    <div class="p-6 h-full flex flex-col">
      <div class="mb-8 flex items-center space-x-2">
        <svg
          class="w-8 h-8 text-primary-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="text-xl font-bold text-primary-700">Dashboard</span>
      </div>

      <nav class="flex-1">
        <ul class="space-y-1">
          <li>
            <router-link
              to="/"
              class="flex items-center p-3 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              active-class="bg-primary-50 text-primary-600 font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Dashboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/products"
              class="flex items-center p-3 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              active-class="bg-primary-50 text-primary-600 font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
              Products
              <span
                class="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800"
              >
                {{ productCount }}
              </span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/categories"
              class="flex items-center p-3 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              active-class="bg-primary-50 text-primary-600 font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
              Categories
            </router-link>
          </li>
          <li>
            <router-link
              to="/users"
              class="flex items-center p-3 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              active-class="bg-primary-50 text-primary-600 font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
              Users
            </router-link>
          </li>
          <li>
            <router-link
              to="/transactions"
              class="flex items-center p-3 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              active-class="bg-primary-50 text-primary-600 font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Transactions
              <span
                v-if="transactionCount > 0"
                class="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800"
              >
                {{ transactionCount }}
              </span>
            </router-link>
          </li>
          <li>
            <!-- <router-link
              to="/settings"
              class="flex items-center p-3 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              active-class="bg-primary-50 text-primary-600 font-medium"
            >
              <svg
                class="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              Settings
            </router-link> -->
          </li>
        </ul>
      </nav>

      <div class="mt-auto pt-4 border-t border-gray-100">
        <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
          <div
            class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium"
          >
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ authStore.user?.username }}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {{ authStore.user?.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useProductStore } from "@/stores/product";
import { useTransactionStore } from '@/stores/transaction';


const authStore = useAuthStore();
const productStore = useProductStore();
const transactionStore = useTransactionStore();


const userInitials = computed(() => {
  if (!authStore.user?.username) return "U";
  return authStore.user.username.charAt(0).toUpperCase();
});

const productCount = computed(() => {
  return productStore.products.length;
});

const transactionCount = computed(() => {
  return transactionStore.transactions.reduce((acc, curr) => acc + curr.transactions.length, 0);
});
</script>
