<template>
  <DefaultLayout>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-semibold text-gray-800">User Management</h1>
        <p class="text-gray-500 mt-2">Manage all system users and their permissions</p>
      </div>
      <router-link
        to="/users/create"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add User
      </router-link>
    </div>

    <div v-if="userStore.loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="user in userStore.users"
        :key="user._id"
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <div class="p-6">
          <div class="flex flex-col items-center">
            <div class="relative">
              <img
                :src="`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`"
                :alt="user.username"
                class="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <span
                class="absolute -bottom-1 -right-1 px-2 py-1 text-xs font-semibold rounded-full shadow"
                :class="{
                  'bg-blue-100 text-blue-800': user.role === 'admin',
                  'bg-indigo-100 text-indigo-800': user.role === 'customer',
                  'bg-gray-100 text-gray-800': !user.role || user.role === 'guest'
                }"
              >
                {{ user.role || 'guest' }}
              </span>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-800">{{ user.username }}</h3>
            <p class="text-gray-600 text-sm">{{ user.email }}</p>
          </div>
          
          <div class="mt-6 pt-5 border-t border-gray-100">
            <div class="flex justify-between text-sm text-gray-500">
              <span>Joined</span>
              <span>{{ formatDate(user.createdAt) }}</span>
            </div>
          </div>

          <div class="mt-6 flex justify-center space-x-3">
            <router-link
              :to="{ name: 'edit-user', params: { id: user._id } }"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </router-link>
            <button
              @click="confirmDeleteUser(user)"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="userStore.users.length === 0 && !userStore.loading" class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="mt-4 text-lg font-medium text-gray-900">No users found</h3>
      <p class="mt-2 text-gray-500">Get started by creating a new user.</p>
      <div class="mt-6">
        <router-link
          to="/users/create"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add First User
        </router-link>
      </div>
    </div>

    <ModalDialog
      :show="showDeleteModal"
      title="Delete User"
      confirm-text="Delete"
      @confirm="deleteUser"
      @close="showDeleteModal = false"
    >
      <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Delete user "{{ selectedUser?.username }}"?</h3>
        <p class="mt-2 text-gray-500">
          This will permanently delete the user account and all associated data. This action cannot be undone.
        </p>
      </div>
    </ModalDialog>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import ModalDialog from '@/components/ui/ModalDialog.vue';
import { useUserStore } from '@/stores/user';
import { ref, onMounted } from 'vue';
import type { User } from '@/types/user';

const userStore = useUserStore();
const showDeleteModal = ref(false);
const selectedUser = ref<User | null>(null);

onMounted(async () => {
  await userStore.fetchUsers();
});

const confirmDeleteUser = (user: User) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const deleteUser = async () => {
  if (selectedUser.value) {
    try {
      await userStore.deleteUser(selectedUser.value._id);
      showDeleteModal.value = false;
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};
</script>

<style scoped>
/* Add subtle animation to the user cards */
.user-card-enter-active,
.user-card-leave-active {
  transition: all 0.3s ease;
}
.user-card-enter-from,
.user-card-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>