<!-- DialogBox.vue -->
<template>
  <div v-if="visible" :style="styles.overlay" @click.self="onClose">
    <div :style="styles.dialog">
      <p>{{ message }}</p>
      <button :style="styles.button" @click="onClose">OK</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  message: string;
  visible: boolean;
  onClose: () => void;
}>();

const styles = {
  overlay: {
    position: 'fixed',
    top: '0', left: '0', right: '0', bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999',
  },
  dialog: {
    backgroundColor: '#fff',
    padding: '20px 30px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  button: {
    marginTop: '20px',
    padding: '8px 20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

function onClose() {
  props.onClose();
}
</script>
