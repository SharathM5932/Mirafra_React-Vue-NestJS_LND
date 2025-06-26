<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header.text }}
            </th>
            <th
              v-if="actions"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="(item, index) in items" 
            :key="index"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <td
              v-for="(header, headerIndex) in headers"
              :key="headerIndex"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
            >
              {{ item[header.value] }}
            </td>
            <td v-if="actions" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-3">
                <button
                  v-if="actions.edit"
                  @click="$emit('edit', item)"
                  class="text-primary-600 hover:text-primary-800 flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit
                </button>
                <button
                  v-if="actions.delete"
                  @click="$emit('delete', item)"
                  class="text-red-600 hover:text-red-800 flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="loading"
      class="flex justify-center items-center p-8 bg-white bg-opacity-75"
    >
      <div class="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-primary-100"></div>
    </div>
    <div
      v-if="items.length === 0 && !loading"
      class="text-center py-8 text-gray-400"
    >
      <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
      </svg>
      <p class="mt-2 text-sm font-medium">No data available</p>
      <p class="mt-1 text-xs text-gray-500">Add new items to see them displayed here</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  headers: {
    type: Array as PropType<Array<{ text: string; value: string }>>,
    required: true,
  },
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  actions: {
    type: Object as PropType<{ edit: boolean; delete: boolean }>,
    default: () => ({ edit: false, delete: false }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['edit', 'delete']);
</script>