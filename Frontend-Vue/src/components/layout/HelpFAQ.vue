<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
    <h2 class="text-2xl font-semibold mb-4">Help & FAQ</h2>

    <!-- Search Bar -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search FAQs..."
      class="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <!-- FAQ Accordion -->
    <div v-for="(item, index) in filteredFAQs" :key="index" class="mb-4 border-b">
      <button
        @click="toggle(index)"
        class="w-full flex justify-between items-center py-3 text-left text-gray-800 font-medium focus:outline-none"
      >
        {{ item.question }}
        <span>
          <svg
            v-if="activeIndex === index"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transform rotate-180 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div v-if="activeIndex === index" class="text-gray-600 pb-4">
        {{ item.answer }}
      </div>
    </div>

    <!-- No results message -->
    <p v-if="filteredFAQs.length === 0" class="text-center text-gray-500">No matching FAQs found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeIndex = ref<null | number>(null)

const faqs = [
  {
    question: "How do I add a new product?",
    answer: "Go to the 'Products' section and click 'Add Product'. Enter the details like name, price, description, and upload images."
  },
  {
    question: "Can I manage user roles?",
    answer: "Yes. Visit the 'Users' section to change roles between Admin, Manager, and Customer."
  },
  {
    question: "How do I view recent orders?",
    answer: "Check the 'Orders' page for a list of all recent purchases, with order ID, status, and total amount."
  },
  {
    question: "How do I issue a refund?",
    answer: "Select the order from the 'Orders' page and click 'Issue Refund'. Enter the amount and reason if needed."
  },
  {
    question: "What if I forget my password?",
    answer: "Click 'Forgot Password' on the login page and follow the instructions to reset it."
  },
  {
    question: "How can I customize the dashboard appearance?",
    answer: "In 'Settings', toggle between light and dark themes under the Appearance section."
  }
]

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const filteredFAQs = computed(() =>
  faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)
</script>

<style scoped>
/* Smooth toggle animation (optional) */
</style>
