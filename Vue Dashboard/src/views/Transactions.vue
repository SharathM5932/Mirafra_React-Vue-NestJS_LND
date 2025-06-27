<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans tracking-wide px-4 sm:px-6 lg:px-8 py-12">
    <!-- Summary Cards -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
      
      <!-- Total Unique Users Card -->
      <div
        class="bg-white rounded-lg shadow border border-gray-200 p-6 flex flex-col items-center
               transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
      >
        <div class="flex items-center space-x-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p class="text-gray-500 uppercase tracking-wide font-semibold text-sm">Total Unique Users</p>
        </div>
        <p class="text-4xl font-extrabold text-gray-900">{{ uniqueUserCount }}</p>
      </div>

      <!-- Total Transactions Card -->
      <div
        class="bg-white rounded-lg shadow border border-gray-200 p-6 flex flex-col items-center
               transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
      >
        <div class="flex items-center space-x-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 14l2-2m0 0l2-2m-2 2v6m2-10a9 9 0 11-8 8" />
          </svg>
          <p class="text-gray-500 uppercase tracking-wide font-semibold text-sm">Total Transactions</p>
        </div>
        <p class="text-4xl font-extrabold text-gray-900">{{ transactions.length }}</p>
      </div>

      <!-- Total Revenue Card -->
      <div
        class="bg-white rounded-lg shadow border border-gray-200 p-6 flex flex-col items-center
               transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
      >
        <div class="flex items-center space-x-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM6 14v4a2 2 0 002 2h8a2 2 0 002-2v-4" />
          </svg>
          <p class="text-gray-500 uppercase tracking-wide font-semibold text-sm">Total Revenue</p>
        </div>
        <p class="text-4xl font-extrabold text-gray-900">${{ totalRevenue.toFixed(2) }}</p>
      </div>
      <div class="flex items-center space-x-2 mb-2">
     <DoughnutChart :transactions="transactions"/>
     </div>


    </div>

    <!-- Divider -->
    <hr class="my-10 border-gray-200" />

    <!-- Transactions List -->
    <div
      class="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 max-h-[600px] overflow-y-auto animate-fadeIn"
      aria-label="Transaction List"
    >
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">All Transactions</h2>

      <div
        v-for="tx in transactions"
        :key="tx.transactionId"
        class="mb-6 last:mb-0 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300"
      >
        <p class="text-gray-700">
          <span class="font-semibold text-gray-900">Transaction ID:</span> {{ tx.transactionId }}
        </p>
        <p class="text-gray-700 mt-1">
          <span class="font-semibold text-gray-900">Email:</span> {{ tx.payerEmail }}
        </p>
        <p class="text-green-600 font-semibold mt-1">
          <span class="font-semibold text-gray-900">Amount:</span> ${{ tx.amount }}
        </p>
        <p class="text-gray-500 mt-1 text-sm">
          <span class="font-semibold text-gray-900">Date:</span> {{ formatDate(tx.date) }}
        </p>
      </div>

      <p v-if="!transactions.length" class="text-center text-gray-400 mt-20 text-xl font-medium italic">
        No transactions found.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { toast } from 'vue3-toastify'
import BarChart from '../components/charts/BarChart.vue';
import DoughnutChart from '../components/charts/DoughnutChart.vue';


interface Transaction {
  transactionId: string
  payerEmail: string
  amount: string
  date: string
}

const transactions = ref<Transaction[]>([])

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString()
}

// Compute unique user count based on distinct payerEmail
const uniqueUserCount = computed(() => {
  const uniqueEmails = new Set(transactions.value.map(tx => tx.payerEmail))
  return uniqueEmails.size
})

// Compute total revenue
const totalRevenue = computed(() => {
  return transactions.value.reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
})

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3004/transactions')
    if (!res.ok) throw new Error('Network response was not ok')

    const data: Transaction[] = await res.json()

    if (data.length === 0) {
      toast.error('No transactions found.')
      return
    }

    transactions.value = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(error)
    toast.error('Failed to fetch transactions')
  }
})
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.7s ease-in-out;
}
</style>
