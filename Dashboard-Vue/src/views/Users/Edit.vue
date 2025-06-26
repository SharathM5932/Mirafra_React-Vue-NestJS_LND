<template>
  <DefaultLayout>
    <div class="mb-8">
      <h1 class="text-3xl font-semibold text-gray-800">Edit User</h1>
      <p class="text-gray-500 mt-2">Update user information</p>
    </div>

    <div v-if="userStore.loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="userStore.currentUser" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <form @submit.prevent="submitForm" class="p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput
            id="username"
            label="Username"
            type="text"
            v-model="form.username"
            placeholder="Enter username"
            required
            :error="errors.username"
            class="focus:ring-blue-500 focus:border-blue-500"
          />
          <FormInput
            id="email"
            label="Email"
            type="email"
            v-model="form.email"
            placeholder="Enter email"
            required
            :error="errors.email"
            class="focus:ring-blue-500 focus:border-blue-500"
          />
          <div class="space-y-1">
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              v-model="form.role"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition-all duration-200"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div class="mt-8 pt-5 flex justify-end space-x-3 border-t border-gray-100">
          <router-link
            to="/users"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
            ></span>
            Update User
          </button>
        </div>
      </form>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">User not found</h3>
      <p class="mt-2 text-gray-500">The user you're looking for doesn't exist or may have been deleted.</p>
      <div class="mt-6">
        <router-link
          to="/users"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Back to Users
        </router-link>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import FormInput from '@/components/ui/FormInput.vue';
import { useUserStore } from '@/stores/user';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { UpdateUserDto } from '@/types/user';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const form = ref<UpdateUserDto>({
  username: '',
  email: '',
  role: 'customer',
});

const errors = ref({
  username: '',
  email: '',
  role: '',
});

const loading = ref(false);

onMounted(async () => {
  await userStore.fetchUserById(route.params.id as string);
  if (userStore.currentUser) {
    form.value = {
      username: userStore.currentUser.username,
      email: userStore.currentUser.email,
      role: userStore.currentUser.role || 'customer',
    };
  }
});

const submitForm = async () => {
  loading.value = true;
  errors.value = {
    username: '',
    email: '',
    role: '',
  };

  try {
    await userStore.updateUser(route.params.id as string, form.value);
    router.push({ name: 'users' });
  } catch (error: any) {
    if (error.response?.data?.message) {
      errors.value.email = error.response.data.message;
    } else {
      errors.value.email = 'Failed to update user. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};
</script>