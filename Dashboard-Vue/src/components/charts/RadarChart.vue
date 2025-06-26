<template>
    <Radar :data="radarData" :options="radarOptions" />
</template>

<script setup lang="ts">
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, Filler, PointElement, LineElement } from 'chart.js';

const radarData = {
    labels: ['Support', 'Quality', 'Speed', 'Pricing', 'Satisfaction'],
  datasets: [
      {
          label: 'Customer Feedback',
      data: [4, 5, 3, 4, 5],
      backgroundColor: 'rgba(59, 130, 246, 0.4)',
      borderColor: '#3b82f6',
    },
  ],
}

const radarOptions = {
    responsive: true,
    plugins: {
        title: { display: true, text: 'Service Feedback Overview' },
    },
}

ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, Filler, PointElement, LineElement)
</script>