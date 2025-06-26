<template>
  <DefaultLayout>
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-3xl font-semibold text-gray-900">Products</h1>
          <p class="text-gray-500 mt-2">Browse and manage your product inventory</p>
        </div>
        <router-link
          to="/products/create"
          class="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Add Product
        </router-link>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 transition-all duration-300">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search Input -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              @input="debounceSearch"
            >
          </div>

          <!-- Category Filter -->
          <div>
            <select
              v-model="selectedCategory"
              class="block w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              @change="filterProducts"
            >
              <option value="">All Categories</option>
              <option
                v-for="category in categoryStore.categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Price Range Filter -->
          <div class="flex items-center gap-3">
            <input
              v-model.number="minPrice"
              type="number"
              min="0"
              placeholder="Min price"
              class="flex-1 block w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              @input="filterProducts"
            >
            <span class="text-gray-400">to</span>
            <input
              v-model.number="maxPrice"
              type="number"
              min="0"
              placeholder="Max price"
              class="flex-1 block w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              @input="filterProducts"
            >
          </div>
        </div>
      </div>

      <!-- Category Tags -->
      <div class="flex flex-wrap gap-2 mb-6 transition-all duration-300" v-if="categoryStore.categories.length">
        <button
          v-for="category in categoryStore.categories"
          :key="category._id"
          @click="toggleCategoryFilter(category._id)"
          class="px-3 py-1.5 text-sm rounded-full border transition-all duration-200"
          :class="{
            'bg-blue-600 text-white border-blue-600': selectedCategories.includes(category._id),
            'bg-white text-gray-700 border-gray-200 hover:bg-gray-50': !selectedCategories.includes(category._id)
          }"
        >
          {{ category.name }}
          <span v-if="selectedCategories.includes(category._id)" class="ml-1">×</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="productStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Products Grid -->
      <div v-else>
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product._id"
            class="w-full bg-white rounded-xl shadow-sm p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100"
          >
            <!-- Product Card Content (same as before) -->
            <div class="relative w-full pt-[100%] mb-4 bg-gray-50 rounded-lg overflow-hidden">
              <img
                :src="product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'"
                :alt="product.title"
                class="absolute top-0 left-0 w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
              />
              <div class="absolute top-3 right-3 bg-white/90 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm">
                ${{ product.price.toFixed(2) }}
              </div>
              <span 
                v-if="getCategoryName(product)"
                class="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm"
              >
                {{ getCategoryName(product) }}
              </span>
            </div>

            <div class="flex-grow flex flex-col">
              <h3 class="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                {{ product.title }}
              </h3>
              
              <div class="flex items-center gap-1 mb-3">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="text-yellow-400 text-sm"
                >
                  <svg
                    :class="{'fill-current': i <= (product.rating?.rate || 0)}"
                    class="w-4 h-4"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <span class="text-xs text-gray-500">({{ product.rating?.count || 0 }})</span>
              </div>

              <p class="text-gray-500 text-xs mb-4 line-clamp-3">
                {{ product.description }}
              </p>

              <div class="mt-auto flex justify-between gap-2">
                <router-link
                  :to="{ name: 'edit-product', params: { id: product._id } }"
                  class="flex items-center justify-center gap-1 text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </router-link>
                <button
                  @click="confirmDeleteProduct(product)"
                  class="flex items-center justify-center gap-1 text-xs px-3 py-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">No products found</h3>
          <p class="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          <button
            @click="resetFilters"
            class="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <ModalDialog
        :show="showDeleteModal"
        title="Delete Product"
        confirm-text="Delete"
        @confirm="deleteProduct"
        @close="showDeleteModal = false"
      >
        <p>Are you sure you want to delete "{{ selectedProduct?.title }}"?</p>
      </ModalDialog>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useCategoryStore } from '@/stores/category';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import ModalDialog from '@/components/ui/ModalDialog.vue';
import type { Product } from '@/types/product';
import { debounce } from 'lodash-es';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const router = useRouter();

// Filter states
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedCategories = ref<string[]>([]);
const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const showDeleteModal = ref(false);
const selectedProduct = ref<Product | null>(null);

// Debounced search
const debounceSearch = debounce(() => {
  filterProducts();
}, 300);

// Computed filtered products
const filteredProducts = computed(() => {
  return productStore.products.filter(product => {
    // Search query filter
    const matchesSearch = searchQuery.value === '' || 
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    // Single category filter
    const matchesCategory = selectedCategory.value === '' || 
      (typeof product.category === 'string' 
        ? product.category === selectedCategory.value 
        : product.category?._id === selectedCategory.value);

    // Multiple categories filter
    const matchesCategories = selectedCategories.value.length === 0 || 
      selectedCategories.value.some(catId => 
        typeof product.category === 'string' 
          ? product.category === catId 
          : product.category?._id === catId
      );

    // Price range filter
    const matchesPrice = 
      (minPrice.value === null || product.price >= minPrice.value) && 
      (maxPrice.value === null || product.price <= maxPrice.value);

    return matchesSearch && matchesCategory && matchesPrice && matchesCategories;
  });
});

// Fetch data on mount
onMounted(async () => {
  await productStore.fetchProducts();
  await categoryStore.fetchCategories();
});

// Filter methods
const filterProducts = () => {
  // The computed property will automatically update
};

const toggleCategoryFilter = (categoryId: string) => {
  const index = selectedCategories.value.indexOf(categoryId);
  if (index === -1) {
    selectedCategories.value.push(categoryId);
  } else {
    selectedCategories.value.splice(index, 1);
  }
  filterProducts();
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedCategories.value = [];
  minPrice.value = null;
  maxPrice.value = null;
};

// Helper methods
const getCategoryName = (product: Product) => {
  if (!product.category) return '';
  if (typeof product.category === 'string') {
    const category = categoryStore.categories.find(c => c._id === product.category);
    return category?.name || '';
  }
  return product.category.name;
};

const confirmDeleteProduct = (product: Product) => {
  selectedProduct.value = product;
  showDeleteModal.value = true;
};

const deleteProduct = async () => {
  if (selectedProduct.value) {
    try {
      await productStore.deleteProduct(selectedProduct.value._id);
      showDeleteModal.value = false;
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions for all interactive elements */
a, button, input, select, .transition-all {
  transition-property: color, background-color, border-color, transform, box-shadow, opacity;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>