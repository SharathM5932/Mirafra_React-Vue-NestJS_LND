<template>
  <DefaultLayout>
    <div class="mb-8">
      <h1 class="text-3xl font-semibold text-gray-900">Edit Product</h1>
      <p class="text-gray-500 mt-2">Update product details</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="product" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="title"
            label="Title"
            type="text"
            v-model="form.title"
            placeholder="Product title"
            required
            :error="errors.title"
          />
          <FormInput
            id="price"
            label="Price"
            type="number"
            v-model="form.price"
            placeholder="Product price"
            min="0"
            step="0.01"
            required
            :error="errors.price"
          />
          
          <div class="col-span-1 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div class="flex gap-2">
              <select
                v-model="form.category"
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                @change="handleCategoryChange"
              >
                <option value="">Select a category</option>
                <option 
                  v-for="category in categoryStore.categories" 
                  :key="category._id" 
                  :value="category._id"
                >
                  {{ category.name }}
                </option>
                <option value="__new__">+ Create new category</option>
              </select>
              <input
                v-if="showNewCategoryInput"
                v-model="newCategoryName"
                type="text"
                placeholder="New category name"
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
          </div>

          <FormInput
            id="image"
            label="Image URL"
            type="text"
            v-model="form.image"
            placeholder="https://example.com/product.jpg"
            required
            :error="errors.image"
          />
        </div>

        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            placeholder="Detailed product description"
            required
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>

        <div class="mt-8 flex justify-end space-x-3">
          <router-link
            to="/products"
            class="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            :disabled="submitting"
          >
            <span
              v-if="submitting"
              class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
            ></span>
            Update Product
          </button>
        </div>
      </form>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <p class="text-gray-600 mb-4">Product not found</p>
      <router-link
        to="/products"
        class="inline-block px-5 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        Back to Products
      </router-link>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useCategoryStore } from '@/stores/category';
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import FormInput from '@/components/ui/FormInput.vue';
import type { Product } from '@/types/product';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

const product = ref<Product | null>(null);
const loading = ref(true);
const submitting = ref(false);

const form = ref({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: ''
});

const newCategoryName = ref('');
const showNewCategoryInput = computed(() => form.value.category === '__new__');

const errors = ref({
  title: '',
  price: '',
  description: '',
  category: '',
  image: ''
});

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    await productStore.fetchProductById(route.params.id as string);
    
    if (productStore.currentProduct) {
      product.value = productStore.currentProduct;
      form.value = {
        title: product.value.title,
        price: product.value.price,
        description: product.value.description,
        category: typeof product.value.category === 'string' 
          ? product.value.category 
          : product.value.category?._id || '',
        image: product.value.image
      };
    }
  } catch (error) {
    console.error('Failed to load product:', error);
  } finally {
    loading.value = false;
  }
});

const handleCategoryChange = () => {
  if (form.value.category !== '__new__') {
    newCategoryName.value = '';
  }
};

const submitForm = async () => {
  submitting.value = true;
  errors.value = { title: '', price: '', description: '', category: '', image: '' };

  try {
    // Validate required fields
    if (!form.value.title) errors.value.title = 'Title is required';
    if (!form.value.price) errors.value.price = 'Price is required';
    if (!form.value.description) errors.value.description = 'Description is required';
    if (!form.value.image) errors.value.image = 'Image URL is required';
    
    // Handle category
    let categoryId = form.value.category;
    if (form.value.category === '__new__') {
      if (!newCategoryName.value) {
        errors.value.category = 'New category name is required';
        return;
      }
      const response = await categoryStore.createCategory(newCategoryName.value);
      categoryId = response.category._id;
    } else if (!form.value.category) {
      errors.value.category = 'Category is required';
      return;
    }

    // Update product
    await productStore.updateProduct(route.params.id as string, {
      ...form.value,
      category: categoryId
    });
    
    router.push({ name: 'products' });
  } catch (error: any) {
    if (error.response?.data?.message) {
      errors.value.category = error.response.data.message;
    } else {
      errors.value.category = error.message || 'Failed to update product';
    }
  } finally {
    submitting.value = false;
  }
};
</script>