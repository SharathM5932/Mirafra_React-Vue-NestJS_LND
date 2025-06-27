<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-4">All Transactions</h2>

    <!-- Search Input -->
    <input
      v-model="searchEmail"
      type="text"
      placeholder="Search by user email..."
      class="mb-6 p-2 border border-gray-300 rounded w-full max-w-md"
    />

    <!-- Loading / Error Messages -->
    <div v-if="loading" class="text-gray-600">Loading transactions...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <!-- Transaction List -->
    <div v-else>
      <div
        v-for="txn in filteredTransactions"
        :key="txn.transaction.id"
        class="bg-white shadow-md rounded-lg mb-4 p-4"
      >
        <p><strong>Txn ID:</strong> {{ txn.transaction.id }}</p>
        <p><strong>Email:</strong> {{ txn.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePaymentStore } from '../store/paymentStore';

const store = usePaymentStore();
const { transactions, getTransactions, loading, error } = store;

const searchEmail = ref('');

// Fetch transactions on component mount
onMounted(() => {
  store.getTransactions();
});

// Computed filtered transactions based on search input
const filteredTransactions = computed(() => {
//   if (!searchEmail.value.trim()) return transactions||[];
  const search = searchEmail.value.trim().toLowerCase();
    if (!Array.isArray(store.transactions)) return [];
  return store.transactions.filter(txn =>
    txn.email?.toLowerCase().includes(search)
  );
});
</script>
