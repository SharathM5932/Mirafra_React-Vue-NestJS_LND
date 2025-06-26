import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/Products/index.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/products/create",
      name: "create-product",
      component: () => import("@/views/Products/Create.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/products/:id/edit",
      name: "edit-product",
      component: () => import("@/views/Products/Edit.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/Categories/index.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/categories/create",
      name: "create-category",
      component: () => import("@/views/Categories/Create.vue"),
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: "/categories/:id/edit",
      name: "edit-category",
      component: () => import("@/views/Categories/Edit.vue"),
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/Users/index.vue"),
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: "/users/create",
      name: "create-user",
      component: () => import("@/views/Users/Create.vue"),
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: "/users/:id/edit",
      name: "edit-user",
      component: () => import("@/views/Users/Edit.vue"),
      meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
      path: "/transactions",
      name: "transactions",
      component: () => import("@/views/Transactions/index.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/transactions/:email",
      name: "user-transactions",
      component: () => import("@/views/Transactions/UserTransactions.vue"),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  authStore.initialize();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== "admin") {
    return { name: "dashboard" };
  }
});

export default router;
