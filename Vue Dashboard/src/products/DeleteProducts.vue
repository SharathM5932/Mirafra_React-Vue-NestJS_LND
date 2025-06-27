<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl text-center font-bold mb-4">
        Delete Products
      </h2>

      <!-- Search input -->
      <div class="mb-6 flex justify-start">
        <input type="text" v-model="searchQuery" placeholder="Search products..."
          class="w-full max-w-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent text-sm" />
      </div>


      <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" :key="product._id"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col transform hover:scale-105">
          <div class="flex-grow">
            <h3 class="text-xl font-semibold mb-2 text-gray-900 truncate">
              {{ product.name }}
            </h3>
            <p class="text-gray-600 mb-1 text-sm">
              <span class="font-medium">Category:</span> {{ product.category }}
            </p>
            <p class="text-gray-600 mb-1 text-sm">
              <span class="font-medium">Price:</span> ₹{{ product.price.toFixed(2) }}
            </p>
            <p class="text-gray-600 mb-3 text-sm">
              <span class="font-medium">Quantity:</span> {{ product.quantity }}
            </p>
          </div>

          <div class="flex justify-end">
            <button @click="deleteItem(product._id)"
              class="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-semibold shadow-sm">
              Delete
            </button>
          </div>
        </div>
      </div>

      <p v-else class="text-center text-gray-500 text-lg mt-16">
        No products available.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

interface Product {
  _id: string
  name: string
  category: string
  price: number
  quantity: number
}

const products = ref<Product[]>([])
const searchQuery = ref('')

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const res = await axios.get('http://localhost:3002/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    products.value = res.data
  } catch (error: any) {
    alert('Failed to load products')
    console.error(error)
  }
}

// Computed property to filter products by name based on search query (case-insensitive)
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const deleteItem = async (id: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return

  try {
    const token = localStorage.getItem('token') || ''
    await axios.delete(`http://localhost:3002/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    products.value = products.value.filter(p => p._id !== id)
    toast.success('Product deleted successfully')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete product')
    console.error(error)
  }
}

onMounted(fetchProducts)
</script>
