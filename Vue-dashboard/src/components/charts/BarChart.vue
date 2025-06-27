<template>
  <Bar :data="barData" :options="barOptions" style="height: 400px;" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from 'chart.js';

import { usePaymentStore } from '../../store/paymentStore';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Get payment data from store
const store = usePaymentStore();
const { transactions, getTransactions } = store;

onMounted(() => {
  getTransactions(); // Fetch transaction data when component mounts
});

// Compute number of transactions per user email
const transactionCounts = computed(() => {
  const counts: Record<string, number> = {};
  transactions.forEach(txn => {
    const email = txn.email || 'Unknown';
    counts[email] = (counts[email] || 0) + 1;
  });
  return counts;
});

// Prepare bar chart data
const barData = computed(() => ({
  labels: Object.keys(transactionCounts.value),
  datasets: [
    {
      label: 'Number of Transactions',
      backgroundColor: '#3b82f6',
      data: Object.values(transactionCounts.value),
    },
  ],
}));

// Chart options (type-safe)
const barOptions: ChartOptions<'bar'> = {
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
    title: {
      display: true,
      text: 'Transactions per User Email',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'User Email',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Transaction Count',
      },
    },
  },
};
</script>
