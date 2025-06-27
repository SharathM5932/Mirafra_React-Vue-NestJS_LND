<script setup lang="ts">
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
 
</script>
 
<template>
    <div class="flex">
        <Sidebar/>
        <div class="flex-1 flex flex-col min-h-screen" >
          <Navbar/>
          <main class="flex-1 ml-64 bg-gray-100 p-6 overflow-y-auto">
           <slot></slot>
          </main>
          <Footer/>
        </div>
    </div>
</template>
