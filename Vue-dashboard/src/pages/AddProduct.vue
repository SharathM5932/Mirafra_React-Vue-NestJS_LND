<template>
  <form @submit.prevent="handleSubmit" class="add-product-form space-y-4 p-4 bg-white rounded shadow-md w-full max-w-md mx-auto mt-8">
    <input name="name" placeholder="Name" v-model="form.name" class="input" />
    <textarea name="desc" placeholder="Description" v-model="form.desc" class="input" />
    <input name="price" type="text" placeholder="Price" v-model="form.price" class="input" />
    <input name="cat" placeholder="Category" v-model="form.cat" class="input" />
    <input name="brand" placeholder="Brand" v-model="form.brand" class="input" />
    <input name="color" placeholder="Color" v-model="form.color" class="input" />
    <input type="file" @change="onFileChange" class="input" />
    <button type="submit" class="btn">Add Product</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../store/productStore';
import { addProduct } from '../services/productService';
import { useAuthStore } from '../store/auth';
import { onMounted } from "vue"

 // ⚠️ Update this path
// or import an action directly if using Vuex
// import { useStore } from 'vuex';

const router = useRouter();
const productStore = useProductStore(); // if using Pinia
const authStore = useAuthStore();

onMounted(() => {
  const user = authStore.user

  // If no user or not admin, redirect
  if (!user || user.role !== 'admin') {
    alert('Access denied. Admins only.')
    router.push('/') // Or use router.replace('/login')
  }});
const form = ref({
  name: '',
  brand: '',
  color: '',
  desc: '',
  price: '',
  cat: '',
  pimg: ''
});

const file = ref<File | null>(null);

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  file.value = target.files?.[0] || null;
};

const handleSubmit = async () => {
  const formData = new FormData();
  Object.entries(form.value).forEach(([key, value]) => formData.append(key, value));
  if (file.value) formData.append('pimg', file.value);

  try {
    // If you're using Pinia:
    await addProduct(formData);

    // If using Vuex:
    // await store.dispatch('addProduct', formData);

    alert('Product added successfully');
    router.push('/');
  } catch (err) {
    alert('Failed to add product');
    console.error(err);
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  background-color: #4f46e5;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}
</style>
