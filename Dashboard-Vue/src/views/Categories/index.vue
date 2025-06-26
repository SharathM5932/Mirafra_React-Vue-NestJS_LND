<template>
  <DefaultLayout>
    <div class="mb-8 flex justify-between items-center animate-fade-in">
      <div>
        <h1 class="text-3xl font-semibold text-gray-900">Categories</h1>
        <p class="mt-2 text-gray-600">Manage your product categories</p>
      </div>
      <router-link
        to="/categories/create"
        class="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Category
      </router-link>
    </div>

    <div v-if="categoryStore.categories.length > 0" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="(category, index) in categoryStore.categories" 
              :key="category._id"
              class="hover:bg-gray-50 transition-colors duration-150"
              :style="`animation-delay: ${index * 0.05}s`"
            >
              <td class="px-6 py-4 whitespace-nowrap animate-fade-in-right">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
                    <!-- <div class="text-sm text-gray-500">12 products</div> -->
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium animate-fade-in-left">
                <router-link
                  :to="{ name: 'edit-category', params: { id: category._id } }"
                  class="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-200"
                >
                  Edit
                </router-link>
                <button
                  @click="confirmDeleteCategory(category)"
                  class="text-red-600 hover:text-red-900 transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">No categories yet</h3>
      <p class="mt-1 text-gray-500">Get started by creating your first product category.</p>
      <div class="mt-6">
        <router-link
          to="/categories/create"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Category
        </router-link>
      </div>
    </div>

    <ModalDialog
      :show="showDeleteModal"
      title="Delete Category"
      confirm-text="Delete"
      confirm-variant="danger"
      @confirm="deleteCategory"
      @close="showDeleteModal = false"
    >
      <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">Delete "{{ selectedCategory?.name }}"?</h3>
        <div class="mt-2 text-sm text-gray-500">
          <p>This will permanently remove the category and cannot be undone.</p>
          <p class="mt-1">Any products in this category will need to be reassigned.</p>
        </div>
      </div>
    </ModalDialog>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import ModalDialog from '@/components/ui/ModalDialog.vue';
import { useCategoryStore } from '@/stores/category';
import { ref, onMounted } from 'vue';
import type { Category } from '@/types/product';

const categoryStore = useCategoryStore();
const showDeleteModal = ref(false);
const selectedCategory = ref<Category | null>(null);

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const confirmDeleteCategory = (category: Category) => {
  selectedCategory.value = category;
  showDeleteModal.value = true;
};

const deleteCategory = async () => {
  if (selectedCategory.value) {
    try {
      await categoryStore.deleteCategory(selectedCategory.value._id);
      showDeleteModal.value = false;
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
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

.animate-fade-in-right {
  animation: fadeInRight 0.5s ease-out forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.5s ease-out forwards;
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

@keyframes fadeInRight {
  from { 
    opacity: 0;
    transform: translateX(10px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInLeft {
  from { 
    opacity: 0;
    transform: translateX(-10px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}
</style>