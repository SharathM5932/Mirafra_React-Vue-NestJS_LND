<template>
    <h2 class="text-xl font-semibold mb-4">Add Product</h2>
    <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-6 bg-white rounded shadow-md space-y-4">
        <input v-model="form.name" name="name" placeholder="Name" required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <textarea v-model="form.desc" name="desc" placeholder="Description" required
            class="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"></textarea>

        <input v-model.number="form.price" name="price" type="number" placeholder="Price" min="0" required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <!-- <input v-model="form.cat" name="cat" placeholder="Category" required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" /> -->

        <select v-model="form.cat" name="cat" required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled selected>Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Beauty">Beauty</option>
            <option value="Footwear">Footwear</option>
        </select>

        <input type="file" @change="handleFileChange" accept="image/*" class="w-full" />

        <button type="submit" :disabled="loading"
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 transition">
            {{ loading ? 'Adding...' : 'Add Product' }}
        </button>
    </form>
</template>

<script setup lang="ts">



import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { createProduct } from '../services/productService';
import { useAuthStore } from "../stores/auth"
import { onMounted } from "vue"

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
    const user = authStore.user

    // If no user or not admin, redirect
    if (!user || user.role !== 'admin') {
        alert('Access denied. Admins only.')
        router.push('/') // Or use router.replace('/login')
    }
});


const productStore = useProductStore();

const form = ref({
    name: '',
    desc: '',
    price: 0,
    cat: '',
});

const file = ref<File | null>(null);
const loading = ref(false);

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    file.value = target.files?.[0] ?? null;
};

const handleSubmit = async () => {
    loading.value = true;

    try {
        const formData = new FormData();
        formData.append('name', form.value.name);
        formData.append('desc', form.value.desc);
        formData.append('price', form.value.price.toString());
        formData.append('cat', form.value.cat);
        if (file.value) formData.append('pimg', file.value);

        // Call API to create product
        const newProduct = await createProduct(formData);
        // Update product store
        productStore.products.push(newProduct);
        alert('Product added successfully');

        // Reset form
        form.value = { name: '', desc: '', price: 0, cat: '' };
        file.value = null;

        // router.push('/');
    } catch (err: any) {
        alert(err.message || 'Failed to add product');
    } finally {
        loading.value = false;
    }
};
</script>
