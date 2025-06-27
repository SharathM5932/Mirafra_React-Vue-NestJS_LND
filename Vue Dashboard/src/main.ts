import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './routes'
import { createPinia } from 'pinia'
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const app = createApp(App)
app.use(createPinia())  // Registering the Pinia for store management
app.use(router)         // For routing
app.mount('#app')       // For mounting the app

app.use(Toast)