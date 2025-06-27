<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form @submit.prevent="handleAddProduct" class="bg-white p-6 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4 text-center">Add Product</h2>

      <input v-model="product.name" type="text" required placeholder="Name" class="mb-2 w-full p-2 border rounded" />
      <input v-model="product.category" type="text" required placeholder="Category" class="mb-2 w-full p-2 border rounded" />
      <input v-model.number="product.price" type="number" required placeholder="Price" class="mb-2 w-full p-2 border rounded" />
      <input v-model.number="product.quantity" type="number" required placeholder="Quantity" class="mb-2 w-full p-2 border rounded" />
      <textarea v-model="product.description" placeholder="Description" class="mb-2 w-full p-2 border rounded"></textarea>

      <input type="file" @change="handleFileChange" class="mb-2 w-full p-2 border rounded" />

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Add Product</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const product = ref({
  name: '',
  category: '',
  price: "",
  quantity: "",
  description: ''
})

const imageFile = ref<File | null>(null)

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    imageFile.value = target.files[0]
  }
}

const handleAddProduct = async () => {
  try {
    const formData = new FormData()
    Object.entries(product.value).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })
    if (imageFile.value) {
      formData.append('image', imageFile.value)
    }

    const token = localStorage.getItem('token')
    await axios.post('http://localhost:3002/products', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    toast.success('Product added successfully!')
    product.value = { name: '', category: '', price: "", quantity: "", description: '' }
    imageFile.value = null
  } catch (error: any) {
    alert(error.response?.data?.message || 'Failed to add product')
    console.error(error)
  }
}
</script>
