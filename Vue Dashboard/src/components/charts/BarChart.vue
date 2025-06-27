
<template>
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow" style="height: 400px;">
    <Bar v-if="barData.labels.length" :data="barData" :options="barOptions" />
    <p v-else class="text-center text-gray-500 mt-20 text-lg">No transactions to display.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Transaction {
  transactionId: string
  payerEmail: string
  amount: string
  date: string
}

const transactions = ref<Transaction[]>([])

// Fetch transactions from API
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3004/transactions')
    if (!res.ok) throw new Error('Failed to fetch transactions')
    const data: Transaction[] = await res.json()
    transactions.value = data
  } catch (error) {
    console.error(error)
  }
})

// Compute counts of transactions per payerEmail
const transactionCounts = computed(() => {
  const counts: Record<string, number> = {}
  transactions.value.forEach(txn => {
    // Use payerEmail; fallback to 'Unknown' if empty
    const email = txn.payerEmail?.trim() || 'Unknown'
    counts[email] = (counts[email] || 0) + 1
  })
  return counts
})

// Chart data for Bar
const barData = computed(() => ({
  labels: Object.keys(transactionCounts.value),
  datasets: [
    {
      label: 'Number of Transactions',
      backgroundColor: '#3b82f6', // Tailwind blue
      data: Object.values(transactionCounts.value),
    },
  ],
}))

// Chart options
const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Transactions Count by User Email',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'User Email',
      },
      ticks: {
        autoSkip: false,
        maxRotation: 45,
        minRotation: 45,
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Transaction Count',
      },
      ticks: {
        stepSize: 1,
        precision: 0,
      },
    },
  },
}
</script>

