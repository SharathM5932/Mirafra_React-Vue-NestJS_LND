<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2 text-center">Product Management</h1>
      <p class="text-gray-600 text-center">Manage your product inventory and catalog</p>
    </div>

    <ProductList :products="mockProducts" />
  </div>
</template>

<script setup lang="ts">
import { mockProducts } from "../data/mockData";
import ProductList from "../components/Product/ProductList.vue";
</script>
