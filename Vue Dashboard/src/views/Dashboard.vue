<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">
      Welcome to Admin Dashboard
    </h1>
  </div>

  <div class="grid grid-cols-2 gap-6 p-6">
    <div class="w-full h-{300px}">
      <BarChart />
    </div>
    <!-- <div class="w-full h-{300px}">
      <LineChart />
    </div>
    <div class="w-full h-{300px}">
     <DoughnutChart />
    </div> -->
    <div class="w-full h-{300px}">
      <PieChart />
    </div> 
    <!-- <div class="w-full h-{300px}">
      <RadarChart />
    </div>  -->
  </div>

</template>

<script lang="ts" setup>
import { useAuthStore } from "../stores/auth"
import { useRouter } from "vue-router"
import { onMounted } from "vue"
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify';
import BarChart from '../components/charts/BarChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import DoughnutChart from '../components/charts/DoughnutChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import RadarChart from '../components/charts/RadarChart.vue';
const authStore = useAuthStore()
const router = useRouter()
const { user } = storeToRefs(authStore)
onMounted(() => {
  const user = authStore.user

  // If no user or not admin, redirect
  if (!user || user.user.role !== 'admin') {
    alert('Access denied. Admins only.')
    router.push('/')
  }
})
</script>

