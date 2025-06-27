<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4">Settings</h2>
    <div class="space-y-4">
      <label class="block">
        <span class="text-gray-700">Name</span>
        <input type="text" class="mt-1 block w-full border px-3 py-2 rounded" placeholder="Your name" />
      </label>

      <label class="block">
        <span class="text-gray-700">Email</span>
        <input type="email" class="mt-1 block w-full border px-3 py-2 rounded" placeholder="you@example.com" />
      </label>

      <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Settings</button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
