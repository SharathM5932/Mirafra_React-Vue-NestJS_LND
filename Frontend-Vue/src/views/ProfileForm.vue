<template>
    <!-- v-model = name => binds the input field to the ref -->
    <!-- automatically handels two way data binding:
        when user types in the input, name.value gets updated
     -->
    <div>
        <input v-model="name" class="input" placeholder="Enter name" />
        <input v-model="email" class="input" placeholder="Enter enter" />
        <button @click="updateProfile">Save</button>
        <!-- <p>
             Re-evaluates only if name or email changes 
            {{userDetails}} 
        </p> -->
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
const name = ref('')
const email = ref('')
// const userDetails = computed(()=>`${name.value} , ${email.value}`)
const updateProfile = () => {
    console.log({
        name: name.value,
        email: email.value
    })
}
</script>