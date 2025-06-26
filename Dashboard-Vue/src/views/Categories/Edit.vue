<template>
  <DefaultLayout>
    <div class="mb-8 animate-fade-in">
      <h1 class="text-3xl font-semibold text-gray-900">Edit Category</h1>
      <p class="mt-2 text-gray-600">Update your product category details</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-pulse rounded-full h-12 w-12 bg-indigo-100 flex items-center justify-center">
        <div class="h-8 w-8 bg-indigo-200 rounded-full animate-ping"></div>
      </div>
    </div>

    <div v-else-if="category" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
      <form @submit.prevent="submitForm" class="space-y-6">
        <FormInput
          id="name"
          label="Category Name"
          type="text"
          v-model="form.name"
          placeholder="e.g. Electronics, Clothing"
          required
          :error="errors.name"
          class="animate-float-in"
          style="animation-delay: 0.1s"
        />
        
        <div class="mt-8 flex justify-end space-x-3 animate-fade-in-up" style="animation-delay: 0.2s">
          <router-link
            to="/categories"
            class="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="px-5 py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 flex items-center"
            :disabled="submitting"
          >
            <span
              v-if="submitting"
              class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
            ></span>
            <span>Update Category</span>
          </button>
        </div>
      </form>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center animate-fade-in">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900">Category not found</h3>
      <p class="mt-2 text-gray-600">The category you're looking for doesn't exist or may have been removed.</p>
      <div class="mt-6">
        <router-link
          to="/categories"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
        >
          Back to Categories
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import FormInput from '@/components/ui/FormInput.vue';
import { useCategoryStore } from '@/stores/category';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Category } from '@/types/category';

const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

const categoryId = route.params.id as string;
const loading = ref(true);
const submitting = ref(false);
const category = ref<Category | null>(null);

const form = ref({
  name: '',
});

const errors = ref({
  name: '',
});

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    const foundCategory = categoryStore.categories.find(c => c._id === categoryId);
    if (foundCategory) {
      category.value = foundCategory;
      form.value = {
        name: foundCategory.name,
      };
    }
  } catch (error) {
    console.error('Failed to fetch category:', error);
  } finally {
    loading.value = false;
  }
});

const submitForm = async () => {
  submitting.value = true;
  errors.value = { name: '' };

  try {
    // Call the updateCategory action from the store
    await categoryStore.updateCategory(categoryId, form.value.name);
    
    // Show success notification (you can add a toast notification here)
    console.log('Category updated successfully');
    
    // Redirect back to categories list
    router.push({ name: 'categories' });
  } catch (error: any) {
    console.error('Update error:', error);
    if (error.response?.data?.message) {
      errors.value.name = error.response.data.message;
    } else {
      errors.value.name = 'Failed to update category. Please try again.';
    }
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

.animate-float-in {
  animation: floatIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatIn {
  from { 
    opacity: 0;
    transform: translateY(15px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
</style>