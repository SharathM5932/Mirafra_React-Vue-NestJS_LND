<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div class="relative">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-48 object-cover"
        @error="handleImageError"
      />
      <span
        class="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full"
        :class="statusClasses"
      >
        {{ product.status.replace("-", " ") }}
      </span>
    </div>

    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-medium text-gray-900 line-clamp-2 flex-1">
          {{ product.name }}
        </h3>
      </div>

      <p class="text-gray-600 text-sm mb-3 line-clamp-3">
        {{ product.description }}
      </p>

      <div class="space-y-2 text-sm mb-4">
        <div class="flex justify-between">
          <span class="text-gray-600">Price:</span>
          <span class="font-medium text-gray-900"> ₹{{ formatPrice(product.price) }} </span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Category:</span>
          <span class="font-medium text-gray-900">{{ product.category }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Stock:</span>
          <span class="font-medium" :class="stockClasses">
            {{ product.stock }} {{ product.stock === 1 ? "item" : "items" }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <button
          @click="handleEdit"
          class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium w-full"
          :disabled="loading"
        >
          {{ loading ? "Loading..." : "Edit" }}
        </button>
        <button
          class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm font-medium w-full"
          :disabled="loading"
        >
          {{ loading ? "Loading..." : "Delete" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  status: "available" | "out-of-stock";
}

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  edit: [product: Product];
  delete: [product: Product];
}>();

const loading = ref(false);

const statusClasses = computed(() => {
  switch (props.product.status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "out-of-stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
});

const stockClasses = computed(() => {
  if (props.product.stock === 0) {
    return "text-red-600 font-medium";
  } else if (props.product.stock < 5) {
    return "text-yellow-600 font-medium";
  }
  return "text-green-600";
});

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN").format(price);
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/placeholder-image.jpg";
};

const handleEdit = () => {
  emit("edit", props.product);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
