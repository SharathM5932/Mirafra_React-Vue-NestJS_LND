<template>
    <Line :data="lineData" :options="lineOptions" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js';


const lineData = {
    labels: ['Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25'],
    datasets: [
        {
            label: 'Revenue (₹)',
            data: [120000, 190000, 300000, 250000, 220000, 280000],
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
</script>