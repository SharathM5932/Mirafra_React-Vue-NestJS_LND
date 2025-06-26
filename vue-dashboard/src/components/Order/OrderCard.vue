<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div class="p-4 flex items-start space-x-4">
      <img
        v-if="order.products[0]?.images[0]"
        :src="order.products[0].images[0]"
        :alt="order.products[0].title"
        class="w-16 h-16 object-cover rounded"
      />
      <div class="flex-1">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-gray-900">{{ order.products[0]?.title }}</h3>
            <p class="text-sm text-gray-500">Qty: {{ order.products[0]?.quantity }}</p>
          </div>
          <span class="text-xs text-gray-700 font-semibold">Order ID: #{{ order.orderId }}</span>
        </div>

        <div class="mt-2 text-sm text-gray-600 space-y-1">
          <p>
            <strong>Order Placed:</strong>
            {{ new Date(order.orderPlacedDate).toLocaleDateString() }}
          </p>
          <p>
            <strong>Address:</strong>
            {{ order.shippingAddress.city }}, {{ order.shippingAddress.country }} -
            {{ order.shippingAddress.pincode }}
          </p>
          <p><strong>Phone:</strong> {{ order.shippingAddress.phoneNumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: {
    type: Object,
    required: true,
  },
});
</script>
