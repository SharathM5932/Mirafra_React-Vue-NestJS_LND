<template>
    <Line :data="lineData" :options="lineOptions" />
</template>
 
<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js';
 


const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue (₹)',
      data: [12000, 19000, 30000, 25000, 22000, 28000],
      fill: false,
      borderColor: '#10b981',
      tension: 0.4,
    },
  ],
}

const lineOptions = {
  responsive: true,
  plugins: {
    title: { display: true, text: 'Monthly Revenue Trend' },
  },
}
ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
 
// defineProps<{ chartData: any, chartOptions: any }>()
 
 
</script>
 