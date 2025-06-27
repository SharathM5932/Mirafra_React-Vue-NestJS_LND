<template>
  <div class="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
    <Pie v-if="pieData.labels.length" :data="pieData" :options="pieOptions" />
    <p v-else class="text-center text-gray-500 mt-10">No data to display</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

interface Transaction {
  amount: string
  date: string
}

// Prepare chart data and options
const pieData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: 'Amount (₹)',
      data: [] as number[],
      backgroundColor: [
        '#3b82f6', '#f87171', '#fbbf24', '#34d399',
        '#8b5cf6', '#ec4899', '#10b981', '#f97316',
        '#06b6d4', '#eab308', '#4b5563', '#a855f7'
      ],
    },
  ],
})

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Transaction Distribution',
    },
  },
}

function parseMonthYear(label: string): Date {
  const [month, year] = label.split(' ')
  return new Date(`${month} 1, ${year}`)
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3004/transactions')
    if (!res.ok) throw new Error('Failed to fetch')

    const transactions: Transaction[] = await res.json()

    const monthlyTotals = transactions.reduce((acc, tx) => {
      const d = new Date(tx.date)
      const label = d.toLocaleString('default', { month: 'short', year: 'numeric' })
      acc[label] = (acc[label] || 0) + parseFloat(tx.amount)
      return acc
    }, {} as Record<string, number>)

    const labels = Object.keys(monthlyTotals).sort((a, b) => parseMonthYear(a).getTime() - parseMonthYear(b).getTime())
    const data = labels.map(label => monthlyTotals[label])

    pieData.value.labels = labels
    pieData.value.datasets[0].data = data
  } catch (e) {
    console.error(e)
  }
})
</script>
