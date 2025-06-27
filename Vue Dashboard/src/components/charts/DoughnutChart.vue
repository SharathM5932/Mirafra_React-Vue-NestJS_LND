<template>
  <div class="w-full h-full relative">
    <Doughnut v-if="chartData.labels.length" :data="chartData" :options="chartOptions" />
    <p v-else class="text-center text-gray-500 mt-20 text-lg">No transactions to display.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

interface Transaction {
  transactionId: string
  payerEmail: string
  amount: string
  date: string
}

const props = defineProps<{
  transactions: Transaction[]
}>()

const amountByUser = computed(() => {
  const amounts: Record<string, number> = {}
  props.transactions.forEach(txn => {
    const email = txn.payerEmail?.trim() || 'Unknown'
    amounts[email] = (amounts[email] || 0) + parseFloat(txn.amount)
  })
  return amounts
})

const chartData = computed(() => ({
  labels: Object.keys(amountByUser.value),
  datasets: [
    {
      label: 'Amount (₹)',
      data: Object.values(amountByUser.value),
      backgroundColor: [
        '#3b82f6', // blue
        '#ef4444', // red
        '#10b981', // green
        '#f59e0b', // yellow
        '#8b5cf6', // purple
        '#ec4899', // pink
      ],
      borderWidth: 1,
    },
  ],
}))

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Spending by User Email',
    },
  },
}
</script>
