<template>
  <!-- <div class="min-h-screen bg-gray-100 text-gray-800"> -->
    <DefaultLayout>
      <router-view/>
    </DefaultLayout>
  <!-- </div> -->
</template>

<script lang="ts">
import DefaultLayout from './components/layout/DefaultLayout.vue';

export default {
  name: 'App',
  components: {
    DefaultLayout
  }
}
</script>

<!-- in-file style -->
<style>
</style>