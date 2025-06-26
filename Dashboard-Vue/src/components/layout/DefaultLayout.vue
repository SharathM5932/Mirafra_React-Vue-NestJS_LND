<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <NavBar />
    <div class="flex flex-1 pt-16">
      <SideBar />
      <div class="flex-1 ml-0 md:ml-64 transition-all duration-300">
        <main class="p-6">
          <div class="max-w-7xl mx-auto">
            <slot />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import Footer from './Footer.vue';
</script>