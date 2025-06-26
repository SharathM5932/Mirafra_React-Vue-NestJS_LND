<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        @click="fetchUsers"
      >
        Refresh
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
    </div>

    <!-- Error state -->
    <div v-if="error" class="text-center py-12 bg-red-50 rounded-lg">
      <p class="text-red-600 text-lg">{{ error }}</p>
      <button
        @click="fetchUsers"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>

    <!-- Success state -->
    <template v-if="!isLoading && !error">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserCard v-for="user in filteredUsers" :key="user._id" :user="user" />
      </div>

      <div v-if="filteredUsers.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No users found</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { User } from "../../types";
import UserCard from "./UserCard.vue";

const users = ref<User[]>([]);
const isLoading = ref(true);
const error = ref("");
const searchQuery = ref("");

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    error.value = "";
    const response = await fetch("http://127.0.0.1:10000/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    users.value = data.data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An unknown error occurred";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;

  const query = searchQuery.value.toLowerCase();
  return users.value.filter((user) => {
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.some((role) => role.toLowerCase().includes(query))
    );
  });
});
</script>
