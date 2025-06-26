<template>
  <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center mb-4">
      <div
        class="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center text-gray-500"
      >
        {{ userInitials }}
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900">{{ user.fullName }}</h3>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
      </div>
    </div>

    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span class="text-gray-600">Phone:</span>
        <span class="font-medium">{{ user.mobileNumber }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Roles:</span>
        <span class="font-medium">{{ formattedRoles }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Joined:</span>
        <span class="font-medium">{{ formatDate(user.createdAt) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Last Updated:</span>
        <span class="font-medium">{{ formatDate(user.modifiedAt) }}</span>
      </div>
    </div>

    <div class="mt-4 flex space-x-2">
      <button
        class="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
      >
        Edit
      </button>
      <button
        class="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { User } from "../../types";

const props = defineProps<{
  user: User;
}>();

const userInitials = computed(() => {
  return props.user.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
});

const formattedRoles = computed(() => {
  return props.user.role.join(", ");
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
