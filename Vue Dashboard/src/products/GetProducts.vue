<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-8">Product Catalog</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product._id"
          class="bg-white shadow rounded-lg overflow-hidden"
        >
          <!-- Smaller image with padding and containment -->
          <div class="p-4 pb-0 flex justify-center items-center bg-gray-50">
            <img
              :src="getImageUrl(product.imageUrl)"
              alt="Product image"
              class="h-28 w-auto object-contain rounded"
              v-if="product.imageUrl"
            />
          </div>

          <div class="p-4">
            <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 mb-1">Category: {{ product.category }}</p>
            <p class="text-sm text-gray-500 mb-1">Qty: {{ product.quantity }}</p>
            <p class="text-blue-600 font-bold mb-2">$ {{ product.price }}</p>
          </div>
        </div>
      </div>

      <p v-if="!products.length" class="text-center text-gray-500 mt-10">No products available.</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref<any[]>([])

const fetchProducts = async () => {
    try {

        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3002/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        products.value = response.data
    } catch (error: any) {
        console.error('Error fetching products:', error.response?.data || error.message)
        alert('Failed to load products')
    }
}

const getImageUrl = (filename: string) => {
    return `http://localhost:3002/${filename}`;
}

onMounted(fetchProducts)
</script>
