<template>
    <Pie :data="pieData" :options="pieOptions" />
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

const pieData = {
    labels: ['Completed', 'Pending', 'Cancelled'],
    datasets: [
        {
            label: 'Order Status',
            data: [75, 15, 10],
            backgroundColor: ['#22c55e', '#fbbf24', '#ef4444'],
        },
    ],
}

const pieOptions = {
    responsive: true,
    plugins: {
        title: { display: true, text: 'Order Completion Status' },
    },
}

ChartJS.register(Title, Tooltip, Legend, ArcElement)


</script>