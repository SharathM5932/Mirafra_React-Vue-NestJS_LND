<template>
  <div class="p-4">
    <!-- Loading / Error / Empty States -->
    <div v-if="loading" class="text-center py-6 text-gray-600">Loading...</div>
    <div v-else-if="error" class="text-center py-6 text-red-600 font-semibold">
      Error: {{ error }}
    </div>
    <div v-else-if="filteredProducts.length === 0" class="text-center py-6 text-gray-500">
      No products found.
    </div>

    <!-- Heading -->
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6 mt-4">
      Products
    </h1>

    <!-- Filters -->
    <div class="flex flex-wrap justify-center gap-4 mb-6 px-4">
      <select v-model="selectedPrice" class="border border-gray-300 rounded px-3 py-1">
        <option value="">All Prices</option>
        <option value="below200">Below ₹200</option>
        <option value="200to400">₹200 - ₹400</option>
        <option value="above400">Above ₹400</option>
      </select>

      <select v-model="selectedBrand" class="border border-gray-300 rounded px-3 py-1">
        <option value="">All Brands</option>
        <option v-for="brand in uniqueBrands" :key="brand" :value="brand">{{ brand }}</option>
      </select>

      <select v-model="selectedColor" class="border border-gray-300 rounded px-3 py-1">
        <option value="">All Colors</option>
        <option v-for="color in uniqueColors" :key="color" :value="color">{{ color }}</option>
      </select>
    </div>

    <!-- Product Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-6">
      <div
        v-for="product in filteredProducts"
        :key="product._id"
        class="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <img
          :src="`http://localhost:3002/prodimgs/${product.pimg}`"
          :alt="product.name"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-900 mb-1 truncate">{{ product.name }}</h3>
          <p class="text-indigo-600 font-semibold text-base mb-2">₹{{ product.price }}</p>
          <p class="text-gray-600 text-sm line-clamp-3">{{ product.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../store/productStore';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const productStore = useProductStore();
const router = useRouter();

const { products, loading, error } = storeToRefs(productStore);

onMounted(() => {
  const user = authStore.user;

  // Access control: redirect if not admin
  if (!user || user.role !== 'admin') {
    alert('Access denied. Admins only.');
    router.push('/');
    return;
  }

  productStore.fetchProducts();
});

// Filters
const selectedPrice = ref('');
const selectedBrand = ref('');
const selectedColor = ref('');

// Compute unique brands and colors for filter options
const uniqueBrands = computed(() => {
  const brands = products.value.map(p => p.brand).filter(Boolean);
  return Array.from(new Set(brands)).sort();
});
const uniqueColors = computed(() => {
  const colors = products.value.map(p => p.color).filter(Boolean);
  return Array.from(new Set(colors)).sort();
});

// Filtered products based on selected filters
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    // Price filter
    if (selectedPrice.value === 'below200' && product.price >= 200) return false;
    if (selectedPrice.value === '200to400' && (product.price < 200 || product.price > 400)) return false;
    if (selectedPrice.value === 'above400' && product.price <= 400) return false;

    // Brand filter
    if (selectedBrand.value && product.brand !== selectedBrand.value) return false;

    // Color filter
    if (selectedColor.value && product.color !== selectedColor.value) return false;

    return true;
  });
});
</script>
