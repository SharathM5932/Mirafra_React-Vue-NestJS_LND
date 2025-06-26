<template>
  <DefaultLayout>
    <div class="animate-fade-in">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p class="text-gray-600 mt-2">
          Welcome back, {{ authStore.user?.username }}! Here's what's happening
          with your business today.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="(stat, index) in stats"
          :key="stat.title"
          class="animate-slide-up"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <div
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">
                  {{ stat.title }}
                </p>
                <p class="text-2xl font-bold text-gray-800 mt-1">
                  {{ stat.value }}
                </p>
              </div>
              <div class="p-3 rounded-lg" :class="stat.bgColor">
                <component :is="stat.icon" class="w-6 h-6 text-white" />
              </div>
            </div>
            <p class="text-xs mt-3" :class="stat.trendColor">
              <span class="font-medium">{{ stat.trend }}</span>
              <span> {{ stat.trendText }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Top Row Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Revenue Chart -->
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800">
              Monthly Revenue Trend
            </h3>
            <select
              class="text-sm border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>
          <div class="h-80">
            <LineChart />
          </div>
        </div>

        <!-- User Engagement -->
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-6">
            User Engagement Split
          </h3>
          <div class="h-80">
            <DoughnutChart />
          </div>
        </div>

        <!-- Order Status -->
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-6">
            Order Completion Status
          </h3>
          <div class="h-80">
            <PieChart />
          </div>
        </div>
      </div>

      <!-- Bottom Row Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Product Sales -->
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800">
              Top Product Categories
            </h3>
            <select
              class="text-sm border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>This month</option>
              <option>Last month</option>
              <option>This quarter</option>
            </select>
          </div>
          <div class="h-80">
            <BarChart />
          </div>
        </div>

        <!-- Service Feedback -->
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-6">
            Service Feedback Overview
          </h3>
          <div class="h-80">
            <RadarChart />
          </div>
        </div>
      </div>

      <!-- Recent Products and Categories -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Products -->
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800">Recent Products</h3>
            <router-link
              to="/products"
              class="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
            >
              View all
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </router-link>
          </div>
          <DataTable
            :headers="[
              { text: 'Title', value: 'title' },
              { text: 'Price', value: 'price' },
              { text: 'Category', value: 'categoryName' },
            ]"
            :items="recentProductsWithCategoryNames"
            :actions="{ edit: false, delete: false }"
          />
        </div>

        <!-- Recent Categories -->
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-800">
              Recent Categories
            </h3>
            <router-link
              to="/categories"
              class="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
            >
              View all
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </router-link>
          </div>
          <DataTable
            :headers="[{ text: 'Name', value: 'name' }]"
            :items="recentCategories"
            :actions="{ edit: false, delete: false }"
          />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import DataTable from "@/components/ui/DataTable.vue";
import { useAuthStore } from "@/stores/auth";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { onMounted, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useTransactionStore } from '@/stores/transaction';


// Import charts
import BarChart from "@/components/charts/BarChart.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import RadarChart from "@/components/charts/RadarChart.vue";

// Icons for the stats cards
const ChartBarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
  </svg>`,
};

const ShoppingCartIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>`,
};

const UsersIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
  </svg>`,
};

const CurrencyDollarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>`,
};

const authStore = useAuthStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();
const transactionStore = useTransactionStore();

onMounted(async () => {
  await productStore.fetchProducts();
  await categoryStore.fetchCategories();
  await userStore.fetchUsers();
  await transactionStore.fetchTransactions();
});

const stats = computed(() => [
  {
    title: "Total Products",
    value: productStore.products.length,
    icon: ShoppingCartIcon,
    trend: "12%",
    trendText: "vs last month",
    trendColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Categories",
    value: categoryStore.categories.length,
    icon: ChartBarIcon,
    trend: "5%",
    trendText: "vs last month",
    trendColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Users",
    value: userStore.users.length,
    icon: UsersIcon,
    trend: "8%",
    trendText: "vs last month",
    trendColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Total Transactions",
    value: transactionStore.transactions.reduce(
      (acc, curr) => acc + curr.transactions.length,
      0
    ),
    icon: CurrencyDollarIcon,
    trend: "15%",
    trendText: "vs last month",
    trendColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  
]);

const recentProductsWithCategoryNames = computed(() => {
  return [...productStore.products].slice(0, 5).map((product) => {
    const category = categoryStore.categories.find(
      (c) => c._id === product.category || c.name === product.category
    );
    return {
      ...product,
      categoryName: category ? category.name : product.category,
    };
  });
});

const recentCategories = computed(() => {
  return [...categoryStore.categories].slice(0, 5);
});
</script>
