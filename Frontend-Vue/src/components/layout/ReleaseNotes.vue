<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
    <h2 class="text-2xl font-semibold mb-4">Release Notes</h2>

    <div v-for="(note, index) in releaseNotes" :key="index" class="mb-6 border-b pb-4">
      <div class="flex justify-between items-center mb-1">
        <h3 class="text-lg font-medium text-gray-800">{{ note.version }}</h3>
        <span class="text-sm text-gray-500">{{ note.date }}</span>
      </div>
      <ul class="list-disc list-inside text-gray-700 space-y-1">
        <li v-for="(item, idx) in note.changes" :key="idx">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const releaseNotes = [
  {
    version: "v1.2.0",
    date: "2025-06-01",
    changes: [
      "Added PayPal integration for direct product purchases.",
      "Implemented 'Forgot Password' feature in the login flow.",
      "Improved Cart microservice logic and synced with frontend Redux state.",
      "Added Help & FAQ and Release Notes sections to the admin panel.",
      "Minor UI fixes on the product detail page."
    ]
  },
  {
    version: "v1.1.0",
    date: "2025-05-22",
    changes: [
      "Introduced Cart microservice and connected with frontend.",
      "Enabled Add to Cart, Remove from Cart, and Quantity Update.",
      "Integrated Redux Toolkit into frontend for global state management."
    ]
  },
  {
    version: "v1.0.0",
    date: "2025-05-15",
    changes: [
      "Initial release of Admin Dashboard.",
      "Implemented authentication with JWT using NestJS Auth microservice.",
      "Added Product microservice with Create, Update, Delete, and List functionality.",
      "User management section with role assignment.",
      "Basic responsive UI using Tailwind CSS."
    ]
  }
]
</script>

<style scoped>
/* Optional styles */
</style>
