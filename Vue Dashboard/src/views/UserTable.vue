<template>
  <div class="p-6 max-w-5xl mx-auto font-sans">
      <h2 class="text-2xl font-bold mb-4">
        User Management
      </h2>

    <!-- Total Users Count Card -->
    <div
      class="mb-6 p-6 bg-gray-100 rounded-lg border border-gray-300 shadow-sm text-gray-800 font-semibold text-xl text-center"
    >
      Total Users: {{ filteredUsers.length }}
    </div>

    <!-- Search Box aligned to left -->
    <div class="mb-8">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search users by name or email..."
        class="w-96 h-12 border border-gray-300 rounded-lg px-4 py-2
               focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800"
      />
    </div>

    <!-- User Cards Grid or No User Message -->
    <div>
      <div v-if="filteredUsers.length === 0" class="text-center text-gray-500 text-lg mt-10">
        User not found.
      </div>
      <div
        v-else
        class="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        <div
          v-for="u in filteredUsers"
          :key="u._id"
          class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm
                 transform transition-transform duration-300 hover:shadow-md hover:scale-105"
        >
          <p class="mb-2 text-gray-900 font-semibold text-lg truncate">{{ u.name }}</p>
          <p class="mb-1 text-gray-700 text-sm"><span class="font-medium">Email:</span> {{ u.email }}</p>
          <p class="mb-5 text-gray-700 text-sm"><span class="font-medium">Role:</span> {{ u.role }}</p>

          <div class="flex space-x-3">
            <button
              @click="editUser(u)"
              class="bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded
                     transition-colors duration-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Edit
            </button>
            <button
              @click="deleteUser(u._id)"
              class="bg-gray-900 text-white font-semibold py-2 px-5 rounded
                     transition-colors duration-200 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="editingUser"
      id="edit-form"
      class="mt-12 max-w-md bg-white p-8 rounded-lg shadow-md mx-auto border border-gray-200"
    >
      <h3 class="text-2xl font-semibold mb-6 text-gray-900">Edit User</h3>
      <form @submit.prevent="submitEdit" novalidate>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2 text-gray-800">Name</label>
          <input
            v-model="editingUser.name"
            type="text"
            class="border border-gray-300 rounded w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-2 text-gray-800">Email</label>
          <input
            v-model="editingUser.email"
            type="email"
            class="border border-gray-300 rounded w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>
        <div class="mb-8">
          <label class="block text-sm font-medium mb-2 text-gray-800">Role</label>
          <select
            v-model="editingUser.role"
            class="border border-gray-300 rounded w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <div class="flex items-center">
          <button
            type="submit"
            class="bg-gray-800 hover:bg-black text-white font-semibold py-3 px-7 rounded transition"
          >
            Save
          </button>
          <button
            type="button"
            @click="cancelEdit"
            class="ml-6 text-gray-700 hover:underline focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// script remains the same as previous
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { toast } from 'vue3-toastify';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

const authStore = useAuthStore();
const router = useRouter();
const { user } = storeToRefs(authStore);

const users = ref<User[]>([]);
const editingUser = ref<User | null>(null);
const searchTerm = ref('');

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/user');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const filteredUsers = computed(() => {
  if (!searchTerm.value.trim()) return users.value;
  const term = searchTerm.value.toLowerCase();
  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
  );
});

const editUser = (u: User) => {
  editingUser.value = { ...u };
  setTimeout(() => {
    document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
};

const cancelEdit = () => {
  editingUser.value = null;
};

const submitEdit = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3001/user/${editingUser.value!._id}`,
      editingUser.value
    );
    const index = users.value.findIndex((u) => u._id === editingUser.value!._id);
    if (index !== -1) {
      users.value[index] = response.data;
    }
    editingUser.value = null;
    toast.success('User updated successfully!');
  } catch (error) {
    console.error('Error updating user:', error);
    toast.error('Failed to update user.');
  }
};

const deleteUser = async (id: string) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`http://localhost:3001/user/${id}`);
      users.value = users.value.filter((u) => u._id !== id);
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.');
    }
  }
};

onMounted(() => {
  const currentUser = authStore.user;
  if (!currentUser || currentUser.user.role !== 'admin') {
    toast.error('Access denied. Admins only.');
    router.push('/');
  } else {
    fetchUsers();
  }
});
</script>
