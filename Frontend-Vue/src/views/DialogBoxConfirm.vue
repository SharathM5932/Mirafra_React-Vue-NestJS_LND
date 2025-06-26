<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-center gap-4">
        <button @click="$emit('confirm')" class="bg-green-600 text-white px-4 py-2 rounded">Yes</button>
        <button @click="$emit('cancel')" class="bg-gray-300 px-4 py-2 rounded">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  message: String,
});
</script>
