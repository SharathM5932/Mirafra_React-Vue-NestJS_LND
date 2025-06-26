<template>
  <DefaultLayout>
    <div class="animate-fade-in">
      <!-- Header -->
      <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Transaction History</h1>
          <p class="text-gray-600 mt-2">Transactions for {{ email }}</p>
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
          <router-link 
            to="/transactions" 
            class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to All
          </router-link>
        </div>
      </div>

      <!-- Customer Info Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 card-hover animate-slide-up">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Customer Information</h3>
            <p class="text-gray-600 mt-1">{{ email }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-center">
              <p class="text-sm text-gray-500">Total Transactions</p>
              <p class="text-2xl font-bold text-primary-600">{{ userTransactions?.transactions?.length || 0 }}</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500">Total Spent</p>
              <p class="text-2xl font-bold text-primary-600">
                ${{ (userTransactions?.transactions?.reduce((acc, tx) => acc + tx.amount, 0) || 0).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">Transaction Details</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
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
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/4"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/3"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/2"></div></td>
                  <td class="px-6 py-4 whitespace-nowrap"><div class="h-4 bg-gray-200 rounded w-1/2"></div></td>
                </tr>
              </template>
              <template v-else-if="userTransactions?.transactions?.length">
                <tr 
                  v-for="(transaction, index) in userTransactions.transactions" 
                  :key="transaction.orderId"
                  class="hover:bg-gray-50 transition-colors duration-150"
                  :class="{'animate-fade-in': !loading}"
                  :style="`animation-delay: ${index * 0.05}s`"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ transaction.orderId }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${{ transaction.amount.toLocaleString() }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="px-2 py-1 text-xs rounded-full"
                      :class="statusClasses(transaction.status)"
                    >
                      {{ transaction.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(transaction.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      @click="viewTransactionDetails(transaction)"
                      class="text-primary-600 hover:text-primary-900"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found for this user
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div v-if="userTransactions?.transactions?.length" class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">{{ userTransactions.transactions.length }}</span> transactions
          </div>
        </div>
      </div>

      <!-- Transaction Details Modal -->
      <div 
        v-if="selectedTransaction"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
        @click.self="selectedTransaction = null"
      >
        <div class="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">Transaction Details</h3>
              <button 
                @click="selectedTransaction = null"
                class="text-gray-400 hover:text-gray-500"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500">Order ID</p>
                <p class="text-lg font-medium text-gray-900">{{ selectedTransaction.orderId }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Amount</p>
                <p class="text-lg font-medium text-gray-900">${{ selectedTransaction.amount.toLocaleString() }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Status</p>
                <p>
                  <span 
                    class="px-3 py-1 text-sm rounded-full"
                    :class="statusClasses(selectedTransaction.status)"
                  >
                    {{ selectedTransaction.status }}
                  </span>
                </p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Date</p>
                <p class="text-lg font-medium text-gray-900">{{ formatDate(selectedTransaction.date) }}</p>
              </div>
              
              <div>
                <p class="text-sm text-gray-500">Customer Email</p>
                <p class="text-lg font-medium text-gray-900">{{ email }}</p>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-200">
              <button
                @click="selectedTransaction = null"
                class="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTransactionStore } from '@/stores/transaction';
import type { Transaction } from '@/types/transaction';

const route = useRoute();
const transactionStore = useTransactionStore();
const selectedTransaction = ref<Transaction | null>(null);

const email = computed(() => route.params.email as string);
const userTransactions = computed(() => 
  transactionStore.transactions.find(t => t.emailid === email.value)
);

onMounted(async () => {
  await transactionStore.fetchTransactionsByEmail(email.value);
});

const refreshTransactions = async () => {
  await transactionStore.fetchTransactionsByEmail(email.value);
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
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const viewTransactionDetails = (transaction: Transaction) => {
  selectedTransaction.value = transaction;
};

const { loading } = transactionStore;
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
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
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