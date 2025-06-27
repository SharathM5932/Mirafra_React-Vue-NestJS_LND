import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";
import Dashboard from "../pages/Dashboard.vue"; 
import Login from "../pages/Login.vue";
import { useAuthStore } from "../store/auth";
import ProfileForm from "../pages/ProfileForm.vue";
import Products from "../pages/Products.vue";
import addProduct from "../pages/addProduct.vue";
import Users from "../pages/Users.vue";
import Transaction from "../pages/Transaction.vue";
import HelpFAQ from "../components/layout/HelpFAQ.vue";
import ReleaseNotes from "../components/layout/ReleaseNotes.vue";
import Settings from "../components/layout/Settings.vue";
const routes :Array<RouteRecordRaw> = [
    { path:"/",
        redirect:"/login"
     },
    { path:"/login",
      name:"Login" ,
      component:Login
    },
    { path:"/dashboard",
      name:"Dashboard" ,
      component:Dashboard,
      meta:{
        requiresPath:true
      }
    },
    { path:"/profileForm",
      name:"ProfileForm" ,
      component: ProfileForm,
      meta:{
        requiresPath:true
      }
    },
     {
        path: "/allproducts",
        name: "Product",
        component: Products
    },
    
   
    {
        path: "/addproducts",
        name: "AddProducts",
        component: addProduct
    },
     {
        path: "/user",
        name: "UserDetails",
        component: Users
    },
    {
        path: "/transaction",
        name: "All Trnasactions",
        component: Transaction
    },
      { path: '/helpfaq', component: HelpFAQ },
  { path: '/releasenotes', component: ReleaseNotes },
  { path: '/setting', component: Settings },

]
const router = createRouter({history: createWebHistory(),routes})
router.beforeEach((to,from,next)=>{
  const authStore = useAuthStore()
 if(to.meta.requiresAuth && !authStore)
  {
      next('/login')
  }
  else{
    next()
  }
})
export default router