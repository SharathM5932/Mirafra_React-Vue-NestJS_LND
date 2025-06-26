<template>
  <div class="p-6 space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="stat in stats" :key="stat.title" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <p v-if="stat.isLoading" class="text-xs text-gray-500">Loading...</p>
            <p v-if="stat.error" class="text-xs text-red-500">{{ stat.error }}</p>
          </div>
          <div class="p-3 rounded-full" :class="stat.bgColor">
            <component :is="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Monthly Revenue Chart -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
        <div class="h-64">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>

      <!-- Order Status Distribution -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
        <div class="h-64">
          <canvas ref="orderStatusChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Product Categories Chart -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
      <div class="h-80">
        <canvas ref="productChart"></canvas>
      </div>
    </div>

    <!-- Data Tables Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Users -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Recent Users</h3>
          <router-link to="/users" class="text-sm text-blue-600 hover:underline"
            >View All</router-link
          >
        </div>
        <div v-if="usersLoading" class="flex justify-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-700"
          ></div>
        </div>
        <div v-else-if="usersError" class="text-center py-8 text-red-500">
          {{ usersError }}
        </div>
        <div v-else class="space-y-4">
          <div v-for="user in recentUsers" :key="user._id" class="flex items-center space-x-3">
            <div
              class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
            >
              {{ getUserInitials(user.fullName) }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ user.fullName }}</p>
              <p class="text-xs text-gray-500">{{ user.email }}</p>
            </div>
            <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Top Products</h3>
          <router-link to="/products" class="text-sm text-blue-600 hover:underline"
            >View All</router-link
          >
        </div>
        <div v-if="productsLoading" class="flex justify-center py-8">
          <div
            class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-700"
          ></div>
        </div>
        <div v-else-if="productsError" class="text-center py-8 text-red-500">
          {{ productsError }}
        </div>
        <div v-else-if="topProducts.length === 0" class="text-center py-8 text-gray-500">
          No products found
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="product in topProducts"
            :key="product._id"
            class="flex items-center space-x-3"
          >
            <img
              v-if="product.images && product.images.length > 0"
              :src="product.images[0]"
              :alt="product.title"
              class="w-12 h-12 rounded-lg object-cover"
              @error="handleImageError"
            />
            <div v-else class="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
              <ShoppingBagIcon class="w-6 h-6 text-gray-400" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ product.title }}</p>
              <p class="text-xs text-gray-500">₹{{ formatPrice(product.price) }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
                {{ product.stock > 0 ? `${product.stock} in stock` : "Out of stock" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <router-link to="/orders" class="text-sm text-blue-600 hover:underline"
          >View All</router-link
        >
      </div>
      <div v-if="ordersLoading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-700"></div>
      </div>
      <div v-else-if="ordersError" class="text-center py-8 text-red-500">
        {{ ordersError }}
      </div>
      <div v-else-if="recentOrders.length === 0" class="text-center py-8 text-gray-500">
        No orders found
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="order in recentOrders"
          :key="order.orderId"
          class="border-b pb-4 last:border-b-0"
        >
          <div class="flex justify-between items-start mb-2">
            <div>
              <p class="text-sm font-medium text-gray-900">
                Order #{{ getOrderNumber(order.orderId) }}
              </p>
              <p class="text-xs text-gray-500">{{ formatDate(order.orderPlacedDate) }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium">₹{{ formatPrice(calculateOrderTotal(order)) }}</p>
              <p class="text-xs text-gray-500">{{ order.products.length }} item(s)</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex -space-x-2">
              <template v-for="(product, idx) in order.products.slice(0, 3)" :key="idx">
                <img
                  v-if="product.images && product.images.length > 0"
                  :src="product.images[0]"
                  :alt="product.title"
                  class="w-8 h-8 rounded-full border-2 border-white object-cover"
                  @error="handleImageError"
                />
                <div
                  v-else
                  class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center"
                >
                  <ShoppingBagIcon class="w-4 h-4 text-gray-400" />
                </div>
              </template>
            </div>
            <p class="text-xs text-gray-500">
              {{ order.products[0].title }}
              <span v-if="order.products.length > 1">+ {{ order.products.length - 1 }} more</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UsersIcon, ShoppingBagIcon, CurrencyDollarIcon } from "@heroicons/vue/24/outline";
import { computed, ref, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";

// Chart instances
let revenueChartInstance: Chart | null = null;
let orderStatusChartInstance: Chart | null = null;
let productChartInstance: Chart | null = null;

// Chart refs
const revenueChart = ref<HTMLCanvasElement>();
const orderStatusChart = ref<HTMLCanvasElement>();
const productChart = ref<HTMLCanvasElement>();

// Reactive state for stats
const stats = ref([
  {
    title: "Total Users",
    value: 0,
    icon: UsersIcon,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    isLoading: true,
    error: "",
  },
  {
    title: "Total Products",
    value: 0,
    icon: ShoppingBagIcon,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    isLoading: true,
    error: "",
  },
  {
    title: "Total Orders",
    value: 0,
    icon: CurrencyDollarIcon,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    isLoading: true,
    error: "",
  },
]);

// Users data
const users = ref([]);
const usersLoading = ref(true);
const usersError = ref("");

// Products data
const products = ref([]);
const productsLoading = ref(true);
const productsError = ref("");

// Orders data
const orders = ref([]);
const ordersLoading = ref(true);
const ordersError = ref("");

// Chart initialization functions
const initRevenueChart = () => {
  if (!revenueChart.value) return;

  const ctx = revenueChart.value.getContext("2d");
  if (!ctx) return;

  // Generate monthly revenue data from orders
  const monthlyRevenue = generateMonthlyRevenueData();

  revenueChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: monthlyRevenue.labels,
      datasets: [
        {
          label: "Revenue (₹)",
          data: monthlyRevenue.data,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "₹" + value.toLocaleString();
            },
          },
        },
      },
    },
  });
};

const initOrderStatusChart = () => {
  if (!orderStatusChart.value) return;

  const ctx = orderStatusChart.value.getContext("2d");
  if (!ctx) return;

  // Generate order status data
  const statusData = generateOrderStatusData();

  orderStatusChartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: statusData.labels,
      datasets: [
        {
          data: statusData.data,
          backgroundColor: [
            "#10B981", // green
            "#F59E0B", // yellow
            "#EF4444", // red
            "#6B7280", // gray
          ],
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
};

const initProductChart = () => {
  if (!productChart.value) return;

  const ctx = productChart.value.getContext("2d");
  if (!ctx) return;

  // Generate product performance data
  const productData = generateProductPerformanceData();

  productChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: productData.labels,
      datasets: [
        {
          label: "Stock Level",
          data: productData.stock,
          backgroundColor: "rgba(34, 197, 94, 0.8)",
          borderColor: "rgb(34, 197, 94)",
          borderWidth: 1,
        },
        {
          label: "Price (₹)",
          data: productData.prices,
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
          yAxisID: "y1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "Stock Level",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Price (₹)",
          },
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value) {
              return "₹" + value.toLocaleString();
            },
          },
        },
      },
    },
  });
};

// Data generation functions
const generateMonthlyRevenueData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [];

  if (orders.value && orders.value.length > 0) {
    // Calculate actual revenue from orders
    const monthlyTotals = {};
    orders.value.forEach((order) => {
      if (order.orderPlacedDate) {
        const month = new Date(order.orderPlacedDate).toLocaleDateString("en-US", {
          month: "short",
        });
        if (!monthlyTotals[month]) monthlyTotals[month] = 0;
        monthlyTotals[month] += calculateOrderTotal(order);
      }
    });

    months.forEach((month) => {
      data.push(monthlyTotals[month] || Math.floor(Math.random() * 50000) + 10000);
    });
  } else {
    // Generate mock data if no orders
    months.forEach(() => {
      data.push(Math.floor(Math.random() * 50000) + 10000);
    });
  }

  return { labels: months, data };
};

const generateOrderStatusData = () => {
  const statuses = ["Completed", "Processing", "Cancelled", "Pending"];
  const data = [65, 20, 10, 5]; // Mock percentages

  return { labels: statuses, data };
};

const generateProductPerformanceData = () => {
  const labels = [];
  const stock = [];
  const prices = [];

  if (products.value && products.value.length > 0) {
    const topProducts = products.value.slice(0, 6);
    topProducts.forEach((product) => {
      labels.push(product.title ? product.title.substring(0, 15) + "..." : "Product");
      stock.push(product.stock || 0);
      prices.push(product.price || 0);
    });
  } else {
    // Mock data
    ["Product A", "Product B", "Product C", "Product D", "Product E"].forEach((name) => {
      labels.push(name);
      stock.push(Math.floor(Math.random() * 100) + 10);
      prices.push(Math.floor(Math.random() * 5000) + 500);
    });
  }

  return { labels, stock, prices };
};

// Initialize all charts
const initAllCharts = async () => {
  await nextTick();
  initRevenueChart();
  initOrderStatusChart();
  initProductChart();
};

// Update charts when data changes
const updateCharts = () => {
  if (revenueChartInstance) {
    const monthlyRevenue = generateMonthlyRevenueData();
    revenueChartInstance.data.datasets[0].data = monthlyRevenue.data;
    revenueChartInstance.update();
  }

  if (productChartInstance) {
    const productData = generateProductPerformanceData();
    productChartInstance.data.labels = productData.labels;
    productChartInstance.data.datasets[0].data = productData.stock;
    productChartInstance.data.datasets[1].data = productData.prices;
    productChartInstance.update();
  }
};

// Fetch user data
const fetchUsers = async () => {
  try {
    usersLoading.value = true;
    usersError.value = "";
    const response = await fetch("http://127.0.0.1:10000/users");

    if (!response.ok) throw new Error("Failed to fetch users");

    const data = await response.json();
    users.value = data.data || [];
    stats.value[0].value = users.value.length;
    stats.value[0].isLoading = false;
  } catch (err) {
    console.error("Error fetching users:", err);
    usersError.value = err instanceof Error ? err.message : "Failed to load users";
    stats.value[0].error = usersError.value;
    stats.value[0].isLoading = false;
  } finally {
    usersLoading.value = false;
  }
};

// Fetch product data
const fetchProducts = async () => {
  try {
    productsLoading.value = true;
    productsError.value = "";
    const response = await fetch("http://127.0.0.1:10002/products");

    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    // Handle the nested structure from your API response
    products.value = data.data?.products || [];
    stats.value[1].value = products.value.length;
    stats.value[1].isLoading = false;
    updateCharts();
  } catch (err) {
    console.error("Error fetching products:", err);
    productsError.value = err instanceof Error ? err.message : "Failed to load products";
    stats.value[1].error = productsError.value;
    stats.value[1].isLoading = false;
  } finally {
    productsLoading.value = false;
  }
};

// Fetch order data
const fetchOrders = async () => {
  try {
    ordersLoading.value = true;
    ordersError.value = "";
    const response = await fetch("http://127.0.0.1:10001/orders");

    if (!response.ok) throw new Error("Failed to fetch orders");

    const data = await response.json();
    orders.value = data.data || [];
    stats.value[2].value = orders.value.length;
    stats.value[2].isLoading = false;
    updateCharts();
  } catch (err) {
    console.error("Error fetching orders:", err);
    ordersError.value = err instanceof Error ? err.message : "Failed to load orders";
    stats.value[2].error = ordersError.value;
    stats.value[2].isLoading = false;
  } finally {
    ordersLoading.value = false;
  }
};

// Computed properties
const recentUsers = computed(() => {
  return users.value.slice(0, 5);
});

const topProducts = computed(() => {
  if (!Array.isArray(products.value)) return [];
  return [...products.value]
    .filter((product) => product && product.price !== undefined)
    .sort((a, b) => (b.price || 0) - (a.price || 0))
    .slice(0, 5);
});

const recentOrders = computed(() => {
  if (!Array.isArray(orders.value)) return [];
  return [...orders.value]
    .filter((order) => order && order.orderPlacedDate)
    .sort((a, b) => new Date(b.orderPlacedDate).getTime() - new Date(a.orderPlacedDate).getTime())
    .slice(0, 5);
});

// Helper functions
const getUserInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "Invalid Date";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "Invalid Date";
  }
};

const formatPrice = (price: number) => {
  if (price === undefined || price === null) return "0";
  return price.toLocaleString();
};

const getOrderNumber = (orderId: string) => {
  if (!orderId) return "N/A";
  return orderId.slice(-6);
};

const calculateOrderTotal = (order: any) => {
  if (!order || !Array.isArray(order.products)) return 0;
  return order.products.reduce((total, product) => {
    return total + (product.totalPrice || 0);
  }, 0);
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
};

// Cleanup function
const destroyCharts = () => {
  if (revenueChartInstance) {
    revenueChartInstance.destroy();
    revenueChartInstance = null;
  }
  if (orderStatusChartInstance) {
    orderStatusChartInstance.destroy();
    orderStatusChartInstance = null;
  }
  if (productChartInstance) {
    productChartInstance.destroy();
    productChartInstance = null;
  }
};

// Fetch all data and initialize charts when component mounts
onMounted(async () => {
  await Promise.all([fetchUsers(), fetchProducts(), fetchOrders()]);

  // Initialize charts after data is loaded
  await initAllCharts();
});

// Cleanup on unmount
import { onUnmounted } from "vue";
onUnmounted(() => {
  destroyCharts();
});
</script>
