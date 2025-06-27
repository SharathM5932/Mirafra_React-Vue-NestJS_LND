<template>
    <!-- v-model="name" => binds the input field to the ref  -->
    <!-- automatically handles two way data binding:
      * when user types in the input name.value gets updated
      * 
       -->
    <div>
        <input v-model="name" class="input" placeholder="Enter Name" />
        <input v-model="email" class="input" placeholder="Enter Email" />
        <button @click="updateProfile">Save</button>
        <!-- <p>
        {{ userDetails }}  
        Reevaluates only if name or email changes 
        </p> -->
    </div>

</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
const name = ref('')
const email = ref('')
const userDetails = computed(() => `${name.value}, ${email.value}`)
const updateProfile = () => {
    console.log({
        name: name.value,
        email: email.value
    })
}
</script>
