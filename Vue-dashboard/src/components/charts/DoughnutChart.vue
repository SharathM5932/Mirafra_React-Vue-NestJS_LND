<template>
    <Doughnut :data="doughnutData" :options="doughnutOptions" />
</template>
 
<script setup lang="ts">
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
 

const doughnutData = {
  labels: ['New', 'Returning'],
  datasets: [
    {
      label: 'User Types',
      data: [65, 35],
      backgroundColor: ['#6366f1', '#f59e0b'],
    },
  ],
}

const doughnutOptions = {
  responsive: true,
  plugins: {
    title: { display: true, text: 'User Engagement Split' },
  },
}
ChartJS.register(Title, Tooltip, Legend, ArcElement)
 
// defineProps<{ chartData: any, chartOptions: any }>()
 
 
</script>