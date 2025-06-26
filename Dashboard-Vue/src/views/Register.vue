<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm space-y-4">
          <FormInput
            id="username"
            label="Username"
            type="text"
            v-model="form.username"
            placeholder="Username"
            required
            :error="errors.username"
          />
          <FormInput
            id="email"
            label="Email address"
            type="email"
            v-model="form.email"
            placeholder="Email"
            required
            :error="errors.email"
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            v-model="form.password"
            placeholder="Password"
            required
            :error="errors.password"
          />
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            :disabled="loading"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-red-500 group-hover:text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Register
            <span
              v-if="loading"
              class="ml-2 inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
          </button>
        </div>
      </form>
      <div class="text-center">
        <router-link
          to="/login"
          class="font-medium text-red-600 hover:text-red-500"
        >
          Already have an account? Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import FormInput from '@/components/ui/FormInput.vue';

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  username: '',
  email: '',
  password: '',
});

const errors = ref({
  username: '',
  email: '',
  password: '',
});

const loading = ref(false);

const register = async () => {
  loading.value = true;
  errors.value = { username: '', email: '', password: '' };

  try {
    await authStore.register(form.value);
    // Redirect to login page after successful registration
    router.push({ name: 'login', query: { registered: 'true' } });
  } catch (error: any) {
    if (error.response?.data?.message) {
      errors.value.email = error.response.data.message;
    } else {
      errors.value.email = 'Registration failed. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};
</script>