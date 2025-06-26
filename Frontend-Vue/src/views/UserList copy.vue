<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4">User List</h2>
    <!-- <div v-if="loading">Loading users...</div> -->
    <Spinner v-if="loading" />
    <div v-if="error" class="text-red-600">{{ error }}</div>
    <div class="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Search by name or email..."
    class="border p-2 rounded w-full sm:w-1/3"
  />

  <select v-model="roleFilter" class="border p-2 rounded w-full sm:w-1/4">
    <option value="">All Roles</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </select>
</div>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 border">Name</th>
          <th class="py-2 px-4 border">Email</th>
          <th class="py-2 px-4 border">Phone</th>
          <th class="py-2 px-4 border">Role</th>
          <th class="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user._id">
          <td class="py-2 px-4 border">{{ user.name }}</td>
          <td class="py-2 px-4 border">{{ user.emailid }}</td>
          <td class="py-2 px-4 border">{{ user.phno }}</td>
          <td class="py-2 px-4 border">{{ user.role }}</td>
          <td class="py-2 px-4 border">
            <button @click="editUser(user)" class="text-blue-600 mr-2">Update</button>
            <button @click="deleteUser(user._id)" class="text-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="editingUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 class="text-lg font-bold mb-4">Edit User</h3>
        <form @submit.prevent="submitUpdate">
          <input v-model="form.name" placeholder="Name" class="border p-2 mb-3 w-full" />
          <input v-model="form.emailid" placeholder="Email" class="border p-2 mb-3 w-full" />
          <input v-model="form.phno" placeholder="Phone" class="border p-2 mb-3 w-full" />
          <select v-model="form.role" class="border p-2 mb-4 w-full">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div class="flex justify-end">
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" @click="cancelEdit"
              class="ml-2 px-4 py-2 border rounded text-gray-600">Cancel</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { User, useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const editingUser = ref<User | null>(null);
const form = ref<Partial<User>>({});
const searchQuery = ref('');
const roleFilter = ref('');

const users = ref<User[]>([])
const {error, fetchUsers } = userStore;
let loading = ref(true)

onMounted(async () => {
  await userStore.fetchUsers();
  users.value = userStore.users as User[];
  loading.value = false
});

const editUser = (user: User) => {
  editingUser.value = user;
  form.value = { ...user };
};

const cancelEdit = () => {
  editingUser.value = null;
  form.value = {};
};

const submitUpdate = async () => {
  if (editingUser.value && form.value) {
    await userStore.updateUser(editingUser.value._id, form.value);
    alert('User updated successfully');
    cancelEdit();
  }
};

const deleteUser = async (id: string) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await userStore.deleteUser(id);
  }
};


// Computed filtered user list
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.emailid.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesRole = roleFilter.value
      ? user.role === roleFilter.value
      : true;

    return matchesSearch && matchesRole;
  });
});
</script>