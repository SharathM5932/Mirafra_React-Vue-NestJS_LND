<template>
  <div>
    <div class="flex items-centre justify-centre h-screen bg-grey-100">
      <!-- <h1 class="text-2xl font-bold">
        Login Page
      </h1> -->
      <form @submit.prevent = "handleLogin " class="bg-white p-6 rounded shadow-md w-18">
           <h2 class="text-2x1 font-bold mb-4 text-centre"> Register </h2>
           <div>
        <label for ="name">Name: </label>
        <input class = "w-full p-2 mb-3 border rounded "
                type = "name " 
                id="name" 
                v-model="name"  
                placeholder="Enter Name"
               required/>
        
        </div>
      <div>
        <label for ="email">Email: </label>
        <input class = "w-full p-2 mb-3 border rounded "
                type = "email " 
                id="email" 
                v-model="email"  
                placeholder="Enter Email"
               required/>
        <label for ="password">Password: </label>
        </div>
        <div>
        <input class = "w-full p-2 mb-3 border rounded "
                type = "password " 
                id="password" 
                v-model="password"  
                placeholder="Enter Password"
               required/>
      </div> 
      
        <div>
        <input class = "w-full p-2 mb-3 border rounded "
                type = "role " 
                id="role" 
                v-model="role"  
                placeholder="Enter role"
               required/>
      </div> 
      <button type="submit" class ="w-full bg-blue-600 text-white p2 rounded hovered:bg-blue-700" >Register</button>

      </form>
    </div>
  </div>
</template>
<script setup lang="ts" >

import {ref} from 'vue'
import { useAuthStore } from '../store/auth';
import axios from "axios"
import { useRouter } from 'vue-router';

const name = ref("")
const email = ref("")
const password = ref("")
const role = ref("")
const router = useRouter();
const authStore = useAuthStore();
const handleLogin = async () => {
   try{
    const res = await axios.post("http://localhost:3000/auth/register" , {Name: name.value,Email:email.value,Password:password.value,role:role.value})
    const {message,accessToken,user} = res.data
    authStore.setToken(accessToken)
    alert(message)
    router.push('/dashboard')
    
   }
   catch(error:any){
     alert(error.response?.data?.message || 'Register failed')
   }
}


</script>