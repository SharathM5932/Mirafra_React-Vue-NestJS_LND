<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl text-center font-bold text-gray-900 mb-2">User Management</h1>
      <p class="text-gray-600 text-center">Manage and monitor all users in your system</p>
    </div>

    <UserList />
  </div>
</template>

<script setup lang="ts">
import UserList from "../components/User/UserList.vue";
</script>
