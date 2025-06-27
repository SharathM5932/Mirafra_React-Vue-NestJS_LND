<template>

    <!-- vv-model =name=> binds the input field to the ref --> 
     <!--Automatically handles  2 way data binding:
      when types in input then name.value gets updated
     
     -->
    <div>
        <!-- <input v-model="name" class = "input" placeholder ="Enter Name"/>
        <input v-model="email" class = "input" placeholder ="Enter Email"/>
        <button  @click="updateProfile"> Save</button> -->

        <p>

            <!-- Reevaluates only if name or email changes -->
            {{ userDetails }}
        </p>

    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';

const name = ref('')
const email =ref('')
const userDetails = computed(()=>`${name.value},${email.value}`)
const updateProfile=()=>({
   name:name.value,
   email:name.value
})

</script>

