<template>
  <div>
    <!-- <div v-if="loading" class="text-center py-6 text-gray-600">Loading...</div> -->
    <h2 class="text-xl font-semibold mb-4">Product List</h2>

    <Spinner v-if="loading" />
    <div v-else-if="error" class="text-center py-6 text-red-600 font-semibold">
      Error: {{ error }}
    </div>
    <div v-else-if="products.length === 0" class="text-center py-6 text-gray-500">
      <!-- No products found. -->
      <Spinner v-if="loading" />
    </div>
    <div class="flex flex-wrap justify-center gap-5 px-4">
      <div v-for="product in products" :key="product._id" @click="goToDetail(product._id)"
        class="max-w-xs w-full bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer transition-shadow hover:shadow-lg">
        <img :src="`http://localhost:3002/prodimgs/${product.pimg}`" :alt="product.name"
          class="w-full h-48 object-cover rounded-t-lg" />
        <div class="p-4 text-center">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
          <p class="text-indigo-600 font-bold mb-2">₹{{ product.price }}</p>
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ product.desc }}</p>

          <div class="flex flex-wrap justify-center gap-2">
            <!-- <button
              @click.stop="goToDetail(product._id)"
              class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View
            </button> -->


            <button @click.stop="goToUpdate(product._id)"
              class="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Update
            </button>

            <button @click.stop="deleteProduct(product._id)"
              class="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
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
