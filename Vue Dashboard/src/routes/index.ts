import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import { useAuthStore } from "../stores/auth";
import AddProduct from "../products/AddProduct.vue";
import GetProducts from "../products/GetProducts.vue";
import DeleteProducts from "../products/DeleteProducts.vue";
import ProfileForm from "../views/ProfileForm.vue"
import Settings from "../components/layout/Settings.vue";
import ReleaseNotes from "../components/layout/ReleaseNotes.vue";
import HelpFAQ from "../components/layout/HelpFAQ.vue";
import UpdateProduct from "../products/UpdateProduct.vue";
import UserTable from "../views/UserTable.vue";
import Transactions from "../views/Transactions.vue";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/helpfaq",
        name: "HelpFAQ",
        component: HelpFAQ,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/releasenotes",
        name: "ReleaseNotes",
        component: ReleaseNotes,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/setting",
        name: "Setting",
        component: Settings,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/add-product",
        name: "AddProduct",
        component: AddProduct
    },

    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/products',
        name: 'GetProducts',
        component: GetProducts,
        meta: { requiresAuth: true }
    },
    {
        path: '/delete-product',
        name: 'DeleteProduct',
        component: DeleteProducts,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profileform',
        name: 'ProfileForm',
        component: ProfileForm
    },
    {
        path: '/update/:id',
        name: 'update-product',
        component: UpdateProduct,
        props: true,
    },
     {
        path: '/user',
        name: 'UserTable',
        component: UserTable
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions
    }
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.user?.accessToken) {
        next('/login')
    }
    else {
        next()
    }

    const router = createRouter({
        history: createWebHistory(),
        routes,
    });
})
export default router