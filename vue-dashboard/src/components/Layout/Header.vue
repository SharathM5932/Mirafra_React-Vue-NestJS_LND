<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center">
        <h2 class="text-2xl font-semibold text-gray-900 capitalize">
          {{ $route.name }}
        </h2>
      </div>

      <div class="flex items-center space-x-4">
        <!-- <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div> -->

        <div class="flex items-center space-x-3">
          <!-- <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <BellIcon class="w-6 h-6 text-gray-500" />
          </button> -->

          <div class="flex items-center space-x-3">
            <img src="https://i.pravatar.cc/300" alt="Profile" class="w-8 h-8 rounded-full" />
            <span class="text-gray-700 font-medium font-semibold">Sharath M</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { BellIcon } from "@heroicons/vue/24/outline";
</script>
