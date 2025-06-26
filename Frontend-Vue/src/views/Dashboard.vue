<template>
  <div class="p-6">
    <transition name="fade-slide" appear mode="out-in">
      <h1 v-if="showText" class="text-4xl font-bold mb-4">
        Welcome {{ authStore.user?.name }} to Admin Dashboard
      </h1>
    </transition>

    <!-- Info Tiles -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
      <div class="bg-white shadow-md rounded-lg p-4 text-center">
        <p class="text-gray-600 text-sm">Total Users</p>
        <h2 class="text-2xl font-bold text-blue-600">1,245</h2>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4 text-center">
        <p class="text-gray-600 text-sm">Total Products</p>
        <h2 class="text-2xl font-bold text-green-600">580</h2>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4 text-center">
        <p class="text-gray-600 text-sm">Total Orders</p>
        <h2 class="text-2xl font-bold text-purple-600">389</h2>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4 text-center">
        <p class="text-gray-600 text-sm">Revenue</p>
        <h2 class="text-2xl font-bold text-rose-600">₹1.2L</h2>
      </div>
    </div>
  </div>

  <!-- Charts Section -->
  <div class="grid grid-cols-2 gap-6 p-6">
    <div class="w-full h-[300px]">
      <BarChart />
    </div>
    <div class="w-full h-[300px]">
      <LineChart />
    </div>
    <div class="w-full h-[300px]">
      <DoughnutChart />
    </div>
    <div class="w-full h-[300px]">
      <PieChart />
    </div>
  </div>
   <!-- Bottom Summary Tiles -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 pb-6">
    <div class="bg-white shadow-md rounded-lg p-4 text-center">
      <p class="text-gray-600 text-sm">Pending Orders</p>
      <h2 class="text-xl font-bold text-yellow-600">42</h2>
    </div>
    <div class="bg-white shadow-md rounded-lg p-4 text-center">
      <p class="text-gray-600 text-sm">Out of Stock</p>
      <h2 class="text-xl font-bold text-red-500">12</h2>
    </div>
    <div class="bg-white shadow-md rounded-lg p-4 text-center">
      <p class="text-gray-600 text-sm">Active Users</p>
      <h2 class="text-xl font-bold text-teal-600">925</h2>
    </div>
    <div class="bg-white shadow-md rounded-lg p-4 text-center">
      <p class="text-gray-600 text-sm">Customer Reviews</p>
      <h2 class="text-xl font-bold text-indigo-600">1,120</h2>
    </div>
  </div>



</template>


<!-- <script lang="ts" setup>
import { useAuthStore } from "../stores/auth"
import { storeToRefs } from "pinia"

const authStore = useAuthStore()
</script> -->
<script lang="ts" setup>
import { useAuthStore } from "../stores/auth"
import { useRouter } from "vue-router"
import { onMounted, ref } from "vue"
import BarChart from "../components/charts/BarChart.vue"
import LineChart from "../components/charts/LineChart.vue"
import DoughnutChart from "../components/charts/DoughnutChart.vue"
import PieChart from "../components/charts/PieChart.vue"

const totalUsers = ref(0)
const totalProducts = ref(0)


const authStore = useAuthStore()
const router = useRouter()

const showText = ref(false)

onMounted(() => {
  setTimeout(()=>{
    showText.value= true
  },400)
  const user = authStore.user

  // If no user or not admin, redirect
  if (!user || user.role !== 'admin') {
    alert('Access denied. Admins only.')
    router.push('/')
  }
})
</script>