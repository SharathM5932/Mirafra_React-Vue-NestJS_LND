<template>
  <div class="p-6">

<transition name="fade-slide"appear mode="out-in" >
 <h1 class="text-2xl font-bold mb-4">
      Welcome to Admin Dashboard
    </h1>
  </transition>  
    <div class="bg-white shadow-md rounded p-4 max-w-md">
      <p>
        <strong>Name: {{ authStore.user?.Name }}</strong>
      </p>
      <p>
        <strong>Email: {{ authStore.user?.Email }}</strong>
      </p>
      <p>
         <strong>Role: {{ authStore.user?.role }}</strong>
      </p>
      
    </div>
  </div>


  <div class="grid grid-cols-2 gap-6 p-6">
    <div class="w-full h-[300px] ">
  <BarChart/>
  <!-- <LineChart/>
  <DoughnutChart/>
  <PieChart/> -->
  <!-- <div class="w-full h-[300px] col-span-2"></div>
   <RadarChart/> -->
  </div> 
  </div>
</template>

<!-- <script lang="ts" setup>
import { useAuthStore } from "../stores/auth"
import { storeToRefs } from "pinia"

const authStore = useAuthStore()
</script> -->
<script lang="ts" setup>
import { useAuthStore } from "../store/auth"
import { useRouter } from "vue-router"
import { onMounted } from "vue"
import BarChart from "../components/charts/BarChart.vue"
import LineChart from "../components/charts/LineChart.vue"
import DoughnutChart from "../components/charts/DoughnutChart.vue"
import PieChart from "../components/charts/PieChart.vue"
import RadarChart from "../components/charts/RadarChart.vue"
import { ref } from "vue"
const authStore = useAuthStore()
const router = useRouter()
const showText = ref(false)
onMounted(() => {

  setTimeout(()=>{
    showText.value=true
  },500

  )
  const {user} = authStore

  // If no user or not admin, redirect
  if (!user ) {
    alert('Access denied. Admins only.')
    router.push('/') // Or use router.replace('/login')
  }
})
</script>