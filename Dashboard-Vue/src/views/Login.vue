<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <!-- Success message after registration -->
      <div 
        v-if="$route.query.registered" 
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" 
        role="alert"
      >
        <span class="block sm:inline">Registration successful! Please login with your credentials.</span>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm space-y-4">
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

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              v-model="rememberMe"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <router-link
              to="#"
              class="font-medium text-red-600 hover:text-red-500"
            >
              Forgot your password?
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
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
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Sign in
            <span
              v-if="loading"
              class="ml-2 inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
          </button>
        </div>
      </form>

      <div class="text-center">
        <router-link
          to="/register"
          class="font-medium text-red-600 hover:text-red-500"
        >
          Don't have an account? Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import FormInput from '@/components/ui/FormInput.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = ref({
  email: '',
  password: '',
});

const errors = ref({
  email: '',
  password: '',
});

const loading = ref(false);
const rememberMe = ref(false);

const login = async () => {
  loading.value = true;
  errors.value = { email: '', password: '' };

  try {
    const response = await authStore.login(form.value);
    
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }

    // Redirect to either the original requested page or dashboard
    const redirectPath = Array.isArray(route.query.redirect) 
      ? route.query.redirect[0] 
      : route.query.redirect;
    router.push(redirectPath || { name: 'dashboard' });
  } catch (error: any) {
    if (error.response?.data?.message) {
      errors.value.password = error.response.data.message;
    } else {
      errors.value.password = 'Login failed. Please check your credentials and try again.';
    }
  } finally {
    loading.value = false;
  }
};
</script>