import { defineStore } from 'pinia';
import { UserService } from '@/services/user.service';
import type { User, CreateUserDto, UpdateUserDto } from '@/types/user';

interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        this.users = await UserService.getAll();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch users';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserById(id: string) {
      this.loading = true;
      this.error = null;
      try {
        this.currentUser = await UserService.getById(id);
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch user';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createUser(data: CreateUserDto) {
      this.loading = true;
      this.error = null;
      try {
        const user = await UserService.create(data);
        this.users.push(user);
        return user;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to create user';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateUser(id: string, data: UpdateUserDto) {
      this.loading = true;
      this.error = null;
      try {
        const updatedUser = await UserService.update(id, data);
        const index = this.users.findIndex(u => u._id === id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        if (this.currentUser?._id === id) {
          this.currentUser = updatedUser;
        }
        return updatedUser;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to update user';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id: string) {
      this.loading = true;
      this.error = null;
      try {
        await UserService.delete(id);
        this.users = this.users.filter(u => u._id !== id);
        if (this.currentUser?._id === id) {
          this.currentUser = null;
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to delete user';
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});