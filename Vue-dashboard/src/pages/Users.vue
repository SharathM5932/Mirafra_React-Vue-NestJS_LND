<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">User Details</h1>

    <div v-if="loading" class="text-gray-600">Loading users...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else>
      <!-- User counts summary cards -->
      <div class="flex gap-6 mb-6">
        <div class="flex-1 border border-gray-300 rounded-lg p-4 shadow-sm text-center">
          <p class="text-lg font-semibold text-gray-700">Total Users</p>
          <p class="text-3xl font-bold text-gray-900">{{
            totalUsers
          }}</p>
        </div>
        <div class="flex-1 border border-gray-300 rounded-lg p-4 shadow-sm text-center">
          <p class="text-lg font-semibold text-gray-700">Admins</p>
          <p class="text-3xl font-bold text-gray-900">{{ adminCount }}</p>
        </div>
        <div class="flex-1 border border-gray-300 rounded-lg p-4 shadow-sm text-center">
          <p class="text-lg font-semibold text-gray-700">Customers</p>
          <p class="text-3xl font-bold text-gray-900">{{ customerCount }}</p>
        </div>
      </div>

      <table class="w-full border text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2 text-left">Name</th>
            <th class="p-2 text-left">Email</th>
            <th class="p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.Email" class="border-t">
            <td class="p-2">{{ user.Name }}</td>
            <td class="p-2">{{ user.Email }}</td>
            <td class="p-2 capitalize">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '../store/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { users, loading, error } = storeToRefs(userStore)

onMounted(() => {
  userStore.fetchUsers()
})

const totalUsers = computed(() => users.value.length)
const adminCount = computed(() =>
  users.value.filter(user => user.role?.toLowerCase() === 'admin').length
)
const customerCount = computed(() =>
  users.value.filter(user => user.role?.toLowerCase() === 'customer').length
)
</script>
