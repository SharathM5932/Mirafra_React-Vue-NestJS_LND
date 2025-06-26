<template>
  <nav class="navbar-shadow fixed top-0 left-0 right-0 bg-white text-gray-800 z-10 border-b border-gray-100">
    <div class="flex items-center justify-between px-6 h-16">
      <div class="flex items-center space-x-4">
        <button
          @click="toggleSidebar"
          class="p-1 rounded-md text-gray-500 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200 md:hidden"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <router-link 
          to="/" 
          class="text-xl font-semibold text-primary-700 flex items-center"
        >
          <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          DashboardPro
        </router-link>
      </div>
      <div class="flex items-center space-x-6">
        <button class="p-1 text-gray-500 hover:text-primary-600 relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span class="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary-500"></span>
        </button>
        
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center space-x-2 focus:outline-none"
          >
            <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
              {{ userInitials }}
            </div>
            <span class="hidden md:inline font-medium text-gray-700">{{ authStore.user?.username }}</span>
            <svg
              class="w-4 h-4 text-gray-500 transition-transform duration-200"
              :class="{ 'transform rotate-180': isDropdownOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100"
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                >Your Profile</a
              >
              <!-- <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                >Settings</a
              > -->
              <a
                href="#"
                @click="logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                >Logout</a
              >
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const isDropdownOpen = ref(false);
const isSidebarOpen = ref(false);

const userInitials = computed(() => {
  if (!authStore.user?.username) return 'U';
  return authStore.user.username.charAt(0).toUpperCase();
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('-translate-x-full');
  }
};

const logout = () => {
  authStore.logout();
  router.push({ name: 'login' });
};
</script>