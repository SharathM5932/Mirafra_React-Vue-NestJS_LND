<template>
    <Bar :data="barData" :options="barOptions" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, animator } from 'chart.js';

const barData = {
    labels: ['Electronics', 'Clothing', 'Beauty', 'Footware'],
    datasets: [
        {
            label: 'Product Sales',
            backgroundColor: '#3b82f6',
            data: [400, 200, 350, 150],
        },
    ],
}
const animatedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1500,
        easing: 'easeOutQuart',
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: { display: true, text: 'Top Product Categories' },
    },
} as const;
const barOptions = {
    ...animatedOptions,
    plugins: {
        ...animatedOptions.plugins
    },
}

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>
