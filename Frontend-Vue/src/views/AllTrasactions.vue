<template>
    <div class="p-6">
        <h2 class="text-2xl font-semibold mb-4">My Transactions</h2>

        <!-- Search bar -->
        <input type="text" v-model="searchEmail" placeholder="Search by user email..."
            class="mb-4 p-2 border border-gray-300 rounded w-full max-w-md" />

        <!-- Export Button -->
        <button @click="exportCSV" class="mb-4 ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Export CSV
        </button>

        <!-- <div v-if="loading">Loading transactions...</div> -->
        <Spinner v-if="loading" />
        <div v-else-if="error" class="text-red-600">{{ error }}</div>

        <!-- Transactions Table -->
        <table v-else class="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead class="bg-gray-200 text-left">
                <tr>
                    <th class="py-2 px-4">Transaction ID</th>
                    <th class="py-2 px-4">User Email</th>
                    <th class="py-2 px-4">Date</th>
                    <th class="py-2 px-4">Amount</th>
                    <th class="py-2 px-4">Status</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="txn in filteredTransactions" :key="txn.id">
                    <tr class="border-t cursor-pointer hover:bg-gray-100" @click="toggleAccordion(txn.id)">
                        <td class="py-2 px-4">{{ txn.id }}</td>
                        <td class="py-2 px-4">{{ txn.emailid }}</td>
                        <td class="py-2 px-4">{{ formatDate(txn.create_time) }}</td>
                        <td class="py-2 px-4">₹{{ txn?.payer?.purchase_units?.[0]?.amount?.value || 'N/A' }}</td>
                        <td class="py-2 px-4">{{ txn.status }}</td>
                    </tr>

                    <!-- Accordion -->
                    <tr v-if="openTransactionId === txn.id">
                        <td colspan="5" class="bg-gray-50 p-4">
                            <h3 class="font-semibold text-lg mb-2">Transaction Details</h3>
                            <p><strong>Status:</strong> {{ txn.status }}</p>
                            <p><strong>Email:</strong> {{ txn.payer?.payer?.email_address }}</p>
                            <p><strong>Name:</strong> {{ txn.payer?.payer?.name?.given_name }} {{
                                txn.payer?.payer?.name?.surname }}</p>
                            <p><strong>Amount:</strong> ₹{{ txn?.payer?.purchase_units?.[0]?.amount?.value }}</p>
                            <p><strong>Date:</strong> {{ formatDate(txn.create_time) }}</p>
                            <p>
                                <strong>Address:</strong>
                                {{
                                    txn.payer?.purchase_units?.[0]?.shipping?.address?.address_line_1
                                }},
                                {{
                                    txn.payer?.purchase_units?.[0]?.shipping?.address?.address_line_2
                                }},
                                {{
                                    txn.payer?.purchase_units?.[0]?.shipping?.address?.admin_area_2
                                }},
                                {{
                                    txn.payer?.purchase_units?.[0]?.shipping?.address?.postal_code
                                }},
                                {{
                                    txn.payer?.purchase_units?.[0]?.shipping?.address?.country_code
                                }}
                            </p>
                        </td>
                    </tr>
                </template>
            </tbody>

            <tfoot>
                <tr class="bg-gray-100 font-semibold">
                    <td class="py-2 px-4" colspan="2">Total Transactions: {{ totalTransactions }}</td>
                    <td class="py-2 px-4" colspan="2">Total Amount: ₹{{ totalAmount.toFixed(2) }}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { usePaymentStore } from '../stores/paymentStore';

const paymentStore = usePaymentStore();
const loading = ref(true);
const searchEmail = ref('');
const openTransactionId = ref<string | null>(null);

const transactions = computed(() => paymentStore.transactions);
const error = computed(() => paymentStore.error);

onMounted(async () => {
    loading.value = true;
    await paymentStore.getTransactions();
    loading.value = false;
});

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

const toggleAccordion = (txnId: string) => {
    openTransactionId.value = openTransactionId.value === txnId ? null : txnId;
};

const filteredTransactions = computed(() => {
    if (!searchEmail.value) return transactions.value;
    return transactions.value.filter(txn =>
        txn.emailid?.toLowerCase().includes(searchEmail.value.toLowerCase())
    );
});

const totalTransactions = computed(() => filteredTransactions.value.length);

const totalAmount = computed(() =>
    filteredTransactions.value.reduce((sum, txn) => {
        const value = parseFloat(txn?.payer?.purchase_units?.[0]?.amount?.value || '0');
        return sum + (isNaN(value) ? 0 : value);
    }, 0)
);

const exportCSV = () => {
    const headers = ['Transaction ID,User Email,Date,Amount,Status'];
    const rows = filteredTransactions.value.map(txn =>
        [
            txn.id,
            txn.emailid,
            formatDate(txn.create_time),
            txn?.payer?.purchase_units?.[0]?.amount?.value || '0',
            txn.status,
        ].join(',')
    );

    const summary = ['', '', 'Total Transactions: ' + totalTransactions.value, 'Total Amount: ₹' + totalAmount.value.toFixed(2), ''].join(',');

    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows).concat([summary]).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border-bottom: 1px solid #e5e7eb;
}
</style>