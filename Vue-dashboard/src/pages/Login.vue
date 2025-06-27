<template>
  <div>
    <div class="flex items-centre justify-centre h-screen bg-grey-100">
      <!-- <h1 class="text-2xl font-bold">
        Login Page
      </h1> -->
      <form @submit.prevent = "handleLogin " class="bg-white p-6 rounded shadow-md w-18">
           <h2 class="text-2x1 font-bold mb-4 text-centre"> Login </h2>
      <div>
        <label for ="email">Email: </label>
        <input class = "w-full p-2 mb-3 border rounded "
                type = "email " 
                id="email" 
                v-model="EmailID"  
                placeholder="Enter Email"
               required/>
        <label for ="password">Password: </label>
        </div>
        <div>
        <input class = "w-full p-2 mb-3 border rounded "
                type = "password" 
                id="password" 
                v-model="Password"  
                placeholder="Enter Password"
               required/>
      </div> 
      <button type="submit" class ="w-full bg-blue-600 text-white p2 rounded hovered:bg-blue-700" >Login</button>

      </form>
    </div>
  </div>
</template>
<script setup lang="ts" >

import {ref, watch} from 'vue'
import { useAuthStore } from '../store/auth';
import axios from "axios"
import { useRouter } from 'vue-router';
import { onMounted,onUpdated,onUnmounted } from 'vue';

const EmailID = ref("")
const Password = ref("")
const router = useRouter();
const authStore = useAuthStore();


// //watch for changes to email
// watch(email,(newValue,oldValue)=>{
//   console.log("email changed from old to new")
// })


// onMounted(()=>{
//   console.log("Component mounted")
// })


// onUpdated(()=>{
//   console.log("Component updated")
// })


// onUnmounted(()=>{
//   console.log("Component destroyed")
// })
const handleLogin = async () => {
   try{
    const res = await axios.post("http://localhost:3000/auth/login" , {Email: EmailID.value,Password:Password.value})
    console.log(res.data)
    const {message,accessToken} = res.data
    const {Email, Name,role} = res.data.user
    console.log(res.data.user)
    authStore.setToken(accessToken)
    authStore.setUser({Name, Email,role}); 
    alert(message)
    router.push('/dashboard')
    
   }
   catch(error:any){
    console.error("Login error:", error);
     alert(error.response?.data?.message || 'Login failed')
   }
}


</script>