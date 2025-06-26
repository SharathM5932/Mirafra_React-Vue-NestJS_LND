<template>
  <DefaultLayout>
    <div class="mb-8 animate-fade-in">
      <h1 class="text-3xl font-semibold text-gray-900">Create New Category</h1>
      <p class="mt-2 text-gray-600">Add a new product category to your inventory</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md">
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
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
            ></span>
            <span>Create Category</span>
          </button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import FormInput from '@/components/ui/FormInput.vue';
import { useCategoryStore } from '@/stores/category';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const categoryStore = useCategoryStore();
const router = useRouter();

const form = ref({
  name: '',
});

const errors = ref({
  name: '',
});

const loading = ref(false);

const submitForm = async () => {
  loading.value = true;
  errors.value = { name: '' };

  try {
    await categoryStore.createCategory(form.value.name);
    router.push({ name: 'categories' });
  } catch (error: any) {
    if (error.response?.data?.message) {
      errors.value.name = error.response.data.message;
    } else {
      errors.value.name = 'Failed to create category. Please try again.';
    }
  } finally {
    loading.value = false;
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