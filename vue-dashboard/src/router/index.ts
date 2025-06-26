import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Users from "../views/Users.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/users", name: "Users", component: Users },
  { path: "/products", name: "Products", component: Products },
  { path: "/orders", name: "Orders", component: Orders },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
