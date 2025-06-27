<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl text-center font-bold mb-4">
        Update Products
      </h2>

      <!-- Search Box -->
      <div class="mb-6 flex justify-start">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products..."
          class="w-full max-w-sm px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent text-sm"
        />
      </div>

      <!-- Products Grid -->
      <transition-group
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-4"
      >
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="bg-white rounded-lg shadow-md p-6 flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
        >
          <div>
            <div v-if="editingProductId === product._id" class="flex flex-col gap-3">
              <!-- Edit Form -->
              <form @submit.prevent="submitUpdate(product._id)">
                <input
                  v-model="product.name"
                  type="text"
                  placeholder="Name"
                  class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  v-model="product.category"
                  type="text"
                  placeholder="Category"
                  class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  v-model.number="product.price"
                  type="number"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                  class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  v-model.number="product.quantity"
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  v-model="product.description"
                  placeholder="Description"
                  rows="3"
                  class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>

                <div class="flex gap-3 mt-4">
                  <button
                    type="submit"
                    class="flex-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-300 font-semibold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    @click="cancelEdit"
                    class="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition-colors duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div v-else class="flex flex-col flex-grow">
              <!-- Product Info -->
              <h3 class="text-xl font-semibold mb-2 text-gray-900 truncate">
                {{ product.name }}
              </h3>
              <p class="text-gray-600 mb-1 text-sm">
                <strong>Category:</strong> {{ product.category }}
              </p>
              <p class="text-gray-600 mb-1 text-sm">
                <strong>Price:</strong> ${{ product.price.toFixed(2) }}
              </p>
              <p class="text-gray-600 mb-3 text-sm">
                <strong>Quantity:</strong> {{ product.quantity }}
              </p>
              <p class="text-gray-700 text-sm mb-auto whitespace-pre-wrap">
                {{ product.description || 'No description provided.' }}
              </p>

              <button
                @click="startEdit(product._id)"
                class="mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <p v-if="filteredProducts.length === 0" class="text-center text-gray-500 text-lg mt-10">
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
  description?: string
}

const products = ref<Product[]>([])
const searchQuery = ref('')
const editingProductId = ref<string | null>(null)

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token') || ''
    const res = await axios.get('http://localhost:3002/products', {
      headers: { Authorization: `Bearer ${token}` }
    })
    products.value = res.data
  } catch (error: any) {
    toast.error('Failed to fetch products')
    console.error(error)
  }
}

const startEdit = (id: string) => {
  editingProductId.value = id
}

const cancelEdit = () => {
  editingProductId.value = null
  fetchProducts()
}

const submitUpdate = async (id: string) => {
  try {
    const product = products.value.find(p => p._id === id)
    if (!product) return

    const token = localStorage.getItem('token') || ''
    await axios.put(`http://localhost:3002/products/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` }
    })

    toast.success('Product updated successfully')
    editingProductId.value = null
    fetchProducts()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Update failed')
    console.error(error)
  }
}

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return products.value.filter(
    p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  )
})

onMounted(fetchProducts)
</script>
