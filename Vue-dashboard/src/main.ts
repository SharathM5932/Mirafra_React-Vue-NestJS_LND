import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './routes'
import {createPinia} from "pinia"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')