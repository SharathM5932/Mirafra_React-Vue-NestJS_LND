<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Product Management</h2>

    <!-- Loading Spinner -->
    <Spinner v-if="loading" />

    <!-- Error Message -->
    <div v-else-if="error" class="text-center py-6 text-red-600 font-semibold">
      Error: {{ error }}
    </div>

    <!-- No Products Message -->
    <div v-else-if="products.length === 0" class="text-center py-6 text-gray-500">
      No products available.
    </div>

    <!-- Product Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in products"
        :key="product._id"
        @click="goToDetail(product._id)"
        class="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
      >
        <img
          :src="`http://localhost:3002/prodimgs/${product.pimg}`"
          :alt="product.name"
          class="w-full h-48 object-cover"
          @error="onImgError"
        />

        <div class="p-4 text-center">
          <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">{{ product.name }}</h3>
          <p class="text-indigo-600 font-bold text-md mb-2">₹{{ product.price }}</p>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ product.desc }}</p>

          <div class="flex justify-center gap-3">
            <button
              @click.stop="goToUpdate(product._id)"
              class="px-4 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Update
            </button>
            <button
              @click.stop="deleteProduct(product._id)"
              class="px-4 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { useAuthStore } from "../stores/auth"
import Spinner from './Spinner.vue';

interface Product {
  _id: string;
  name: string;
  price: number;
  desc: string;
  pimg: string;
}
const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
};
const authStore = useAuthStore()
const router = useRouter()
const productStore = useProductStore();
const {error, fetchProducts } = productStore;
let products = ref<Product[]>([])
let loading = ref(true)

onMounted(async () => {
  const user = authStore.user
  // If no user or not admin, redirect
  if (!user || user.role !== 'admin') {
    alert('Access denied. Admins only.')
    router.push('/')
  }
})

onMounted(async () => {
  await fetchProducts();
  products.value = productStore.products as Product[];
  loading.value = false
});

const goToUpdate = (id: string) => {
  router.push(`/products/update/${id}`);
};

const deleteProduct = async (id: string) => {
  if (!confirm('Are you sure you want to delete this product?')) return;
  try {
    await productStore.deleteProduct(id);
    await fetchProducts();
  } catch (err) {
    alert('Failed to delete product.');
    console.error(err);
  }
};

const goToDetail = (id: string) => {
  router.push(`/products/${id}`);
};

</script>
