import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import { useAuthStore } from "../stores/auth";
import HelpFAQ from "../components/layout/HelpFAQ.vue";
import ReleaseNotes from "../components/layout/ReleaseNotes.vue";
import Setting from "../components/layout/Setting.vue";
import ProductList from "../views/ProductList.vue";
import ProductDetail from "../views/ProductDetail.vue";
import AddProducts from "../views/AddProducts.vue";
import ProfileForm from "../views/ProfileForm.vue";
import UpdateProduct from "../views/UpdateProduct.vue";
import UserList from "../views/UserList.vue";
import AllTrasactions from "../views/AllTrasactions.vue";

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
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
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
        component: Setting,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/allproducts",
        name: "ProductList",
        component: ProductList
    },
    {
        path: '/products/:id',   // dynamic route
        name: 'ProductDetail',
        component: ProductDetail,
    },
    {
        path: "/allproducts",
        name: "ProductList",
        component: ProductList
    },
    {
        path: "/addproducts",
        name: "AddProducts",
        component: AddProducts
    },
    {
        path: "/profileform",
        name: "ProfileForm",
        component: ProfileForm
    },
    {
        path: '/products/update/:id',
        name: 'ProductUpdate',
        // component: () => import('../views/UpdateProduct.vue')
        component: UpdateProduct
    },
    {
        path: '/userlist',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/alltransactions',
        name: 'AllTransactions',
        component: AllTrasactions
    }
]

const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.token) {
        next('/login')
    }
    else if (to.meta.requiresAdmin && authStore.user?.role !== 'admin') {
        next('/not-authorized')
    }
    else {
        next()
    }
})
export default router