<template>
  <div class="space-y-6">
    <div class="flex flex-wrap gap-4 items-center justify-between">
      <div class="flex items-center space-x-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-model="categoryFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>
      <button
        @click="addProduct"
        class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        Add Product
      </button>
    </div>

    <!-- Skeleton loading cards -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="animate-pulse bg-gray-100 rounded-lg p-4 space-y-4">
        <div class="h-48 bg-gray-300 rounded"></div>
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-300 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        <div class="flex space-x-2">
          <div class="h-10 w-full bg-gray-300 rounded"></div>
          <div class="h-10 w-full bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 text-lg">{{ error }}</p>
      <button
        @click="fetchProducts"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>

    <!-- Products grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product._id"
        :product="product"
        @edit="editProduct"
        @delete="deleteProduct"
      />
    </div>

    <!-- Empty state -->
    <div v-if="!loading && !error && filteredProducts.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">No products found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";

interface ApiProduct {
  _id: string;
  categoryId: string;
  description: string;
  images: string[];
  price: number;
  sellerId: string;
  stock: number;
  title: string;
}

interface ApiResponse {
  data: {
    products: ApiProduct[];
  };
  message: string;
  status: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  status: "available" | "out-of-stock";
}

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref("");
const categoryFilter = ref("");
const statusFilter = ref("");

const categoryMap: Record<string, string> = {
  "67beb96a4cf4283c8e86545b": "Smartphones",
  "67beb9904cf4283c8e86545c": "Laptops",
  "67beba3e4cf4283c8e865461": "Audio",
  "67beba634cf4283c8e865462": "Gaming",
};

const categories = computed(() => {
  const uniqueCategories = [...new Set(products.value.map((p) => p.category))];
  return uniqueCategories.sort();
});

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  if (categoryFilter.value) {
    filtered = filtered.filter((product) => product.category === categoryFilter.value);
  }

  if (statusFilter.value) {
    filtered = filtered.filter((product) => product.status === statusFilter.value);
  }

  return filtered;
});

const transformApiData = (apiProducts: ApiProduct[]): Product[] => {
  return apiProducts.map((product) => ({
    _id: product._id,
    name: product.title,
    description: product.description,
    price: product.price,
    category: categoryMap[product.categoryId] || "Unknown",
    stock: product.stock,
    image: product.images[0] || "/placeholder-image.jpg",
    status: product.stock > 0 ? "available" : "out-of-stock",
  }));
};

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch("http://127.0.0.1:10002/products");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (data.status === "success") {
      products.value = transformApiData(data.data.products);
    } else {
      throw new Error(data.message || "Failed to fetch products");
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An error occurred";
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};

const addProduct = () => {
  console.log("Add product clicked");
};

const editProduct = (product: Product) => {
  console.log("Edit product:", product);
};

const deleteProduct = async (product: Product) => {
  if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
    try {
      const response = await fetch(`http://127.0.0.1:10002/products/${product._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        products.value = products.value.filter((p) => p._id !== product._id);
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
