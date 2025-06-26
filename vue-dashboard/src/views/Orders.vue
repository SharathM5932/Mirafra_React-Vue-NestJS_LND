<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2 text-center">Order Management</h1>
      <p class="text-gray-600 text-center">
        Monitor, manage, and audit all customer orders in real-time.
      </p>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else>
      <div class="grid gap-6 grid-cols-1 grid-cols-2">
        <OrderCard v-for="order in orders" :key="order.orderId" :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import OrderCard from "../components/Order/OrderCard.vue";

const orders = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:10001/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    orders.value = data.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>
