<template>
  <DefaultLayout>
    <div class="animate-fade-in">
      <!-- Header -->
      <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Transaction Management</h1>
          <p class="text-gray-600 mt-2">View and manage all payment transactions</p>
        </div>
        <div class="flex gap-3">
          <button
            @click="refreshTransactions"
            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.title"
          class="animate-slide-up"
          :style="`animation-delay: ${index * 0.1}s`"
        >
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">{{ stat.title }}</p>
                <p class="text-2xl font-bold text-gray-800 mt-1">
                  {{ stat.value }}
                </p>
              </div>
              <div class="p-3 rounded-lg" :class="stat.bgColor">
                <component :is="stat.icon" class="w-6 h-6 text-white" />
              </div>
            </div>
            <p class="text-xs mt-3" :class="stat.trendColor">
              <span class="font-medium">{{ stat.trend }}</span>
              <span> {{ stat.trendText }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">All Transactions</h3>
          <div class="relative w-64">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search transactions..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <template v-if="loading">
                <tr v-for="i in 5" :key="i" class="animate-pulse">
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-3/4"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/3"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/2"></div></td>
                </tr>
              </template>
              <template v-else-if="filteredTransactions.length > 0">
                <tr 
                  v-for="(record, index) in filteredTransactions" 
                  :key="record._id"
                  class="hover:bg-gray-50 transition-colors duration-150"
                  :class="{'animate-fade-in': !loading}"
                  :style="`animation-delay: ${index * 0.05}s`"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ record.emailid }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ record.emailid }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ record.transactions.length }} transactions
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col gap-1">
                      <span 
                        v-for="tx in record.transactions.slice(0, 2)" 
                        :key="tx.orderId"
                        class="text-xs px-2 py-1 rounded-full"
                        :class="statusClasses(tx.status)"
                      >
                        {{ tx.status }}
                      </span>
                      <span 
                        v-if="record.transactions.length > 2" 
                        class="text-xs text-gray-500"
                      >
                        +{{ record.transactions.length - 2 }} more
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(record.transactions[0]?.date) || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <router-link 
                      :to="{ name: 'user-transactions', params: { email: record.emailid } }" 
                      class="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      View
                    </router-link>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">{{ filteredTransactions.length }}</span> of <span class="font-medium">{{ transactions.length }}</span> results
          </div>
          <div class="flex space-x-2">
            <button 
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              @click="currentPage = currentPage + 1"
              :disabled="currentPage * itemsPerPage >= transactions.length"
              class="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { computed, onMounted, ref } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

// Icons for the stats cards
const ChartBarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
  </svg>`
};

const CurrencyDollarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>`
};

const UserGroupIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
  </svg>`
};

const ScaleIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
  </svg>`
};

const transactionStore = useTransactionStore();
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

onMounted(async () => {
  await transactionStore.fetchTransactions();
});

const refreshTransactions = async () => {
  await transactionStore.fetchTransactions();
};

const statusClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const stats = computed(() => [
  {
    title: 'Total Transactions',
    value: transactionStore.transactions.reduce((acc, curr) => acc + curr.transactions.length, 0),
    icon: ChartBarIcon,
    trend: '12%',
    trendText: 'vs last month',
    trendColor: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Total Revenue',
    value: '$' + transactionStore.transactions.reduce((acc, curr) => 
      acc + curr.transactions.reduce((sum, tx) => sum + tx.amount, 0), 0
    ).toLocaleString(),
    icon: CurrencyDollarIcon,
    trend: '18%',
    trendText: 'vs last month',
    trendColor: 'text-primary-600',
    bgColor: 'bg-primary-100'
  },
  {
    title: 'Unique Customers',
    value: transactionStore.transactions.length,
    icon: UserGroupIcon,
    trend: '8%',
    trendText: 'vs last month',
    trendColor: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    title: 'Avg. Transaction',
    value: transactionStore.transactions.length > 0 
      ? '$' + Math.round(transactionStore.transactions.reduce((acc, curr) => 
          acc + curr.transactions.reduce((sum, tx) => sum + tx.amount, 0), 0
        ) / transactionStore.transactions.reduce((acc, curr) => acc + curr.transactions.length, 0)
      ).toLocaleString()
      : '$0',
    icon: ScaleIcon,
    trend: '5%',
    trendText: 'vs last month',
    trendColor: 'text-blue-600',
    bgColor: 'bg-blue-100'
  }
]);

const filteredTransactions = computed(() => {
  if (!searchQuery.value) {
    return transactionStore.transactions;
  }
  const query = searchQuery.value.toLowerCase();
  return transactionStore.transactions.filter(record => 
    record.emailid.toLowerCase().includes(query) ||
    record.transactions.some(tx => 
      tx.orderId.toLowerCase().includes(query) ||
      tx.status.toLowerCase().includes(query)
    )
  );
});

const { transactions, loading } = transactionStore;
</script>

<style scoped>
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

