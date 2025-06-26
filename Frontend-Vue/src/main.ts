import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './routes'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)
app.use(createPinia())  // Registering the Pinia for store management
app.use(router)         // For routing
app.use(vuetify)
useAuthStore().loadUserFromStorage()
app.mount('#app')       // For mounting the app