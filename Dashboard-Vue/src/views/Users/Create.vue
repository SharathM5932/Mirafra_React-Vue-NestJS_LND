<template>
  <DefaultLayout>
    <div class="mb-8">
      <h1 class="text-3xl font-semibold text-gray-800">Create New User</h1>
      <p class="text-gray-500 mt-2">Add a new user to the system</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
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
          <FormInput
            id="password"
            label="Password"
            type="password"
            v-model="form.password"
            placeholder="Create password"
            required
            :error="errors.password"
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
            Create User
          </button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import FormInput from '@/components/ui/FormInput.vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { CreateUserDto } from '@/types/user';

const userStore = useUserStore();
const router = useRouter();

const form = ref<CreateUserDto>({
  username: '',
  email: '',
  password: '',
  role: 'customer',
});

const errors = ref({
  username: '',
  email: '',
  password: '',
  role: '',
});

const loading = ref(false);

const submitForm = async () => {
  loading.value = true;
  errors.value = {
    username: '',
    email: '',
    password: '',
    role: '',
  };

  try {
    await userStore.createUser(form.value);
    router.push({ name: 'users' });
  } catch (error: any) {
    if (error.response?.data?.message) {
      errors.value.email = error.response.data.message;
    } else {
      errors.value.email = 'Failed to create user. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};
</script>