<script setup lang="ts">
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import Footer from './Footer.vue';

</script>

<template>
    <div class="flex">
        <SideBar />
        <div class="flex-1 flex flex-col min-h-screen">
            <NavBar />
            <main class="flex-1 p-6 bg-gray-50">
                <slot />
            </main>
            <Footer />
        </div>
    </div>
</template>