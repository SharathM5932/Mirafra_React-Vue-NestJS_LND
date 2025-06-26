<template>
  <div v-if="loading" class="py-10 text-center text-lg font-medium">Loading...</div>
  <div v-else-if="error" class="py-10 text-center text-lg font-medium text-red-600">Error: {{ error }}</div>
  <div v-else-if="!product" class="py-10 text-center text-lg font-medium">Product not found</div>
  <div v-else class="flex flex-row gap-8 p-5">
    <img
      :src="`http://localhost:3002/prodimgs/${product.pimg}`"
      :alt="product.name"
      class="w-72 h-72 object-cover rounded-xl border border-gray-300"
    />
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-semibold">{{ product.name }}</h2>
      <p class="text-lg"><strong>Price:</strong> ₹{{ product.price }}</p>
      <p class="text-base"><strong>Description:</strong> {{ product.desc }}</p>
      <div class="flex space-x-4 mt-4">
        <button
          @click="handleBuyNow"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Buy Now
        </button>
        <button
          @click="handleBuyNow"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const product = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const productId = route.params.id as string | undefined;

if (!productId) {
  error.value = 'No product ID specified';
  loading.value = false;
}

onMounted(async () => {
  if (!productId) return;

  try {
    const res = await axios.get(`http://localhost:3002/products/${productId}`);
    if (!res.data) {
      error.value = 'Product not found';
    } else {
      product.value = res.data;
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load product';
  } finally {
    loading.value = false;
  }
});

const handleBuyNow = async () => {
  alert('button working');
};
</script>
