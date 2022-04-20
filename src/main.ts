import { createApp } from 'vue'
import App from './App.vue'
import { setupPinia } from './stores'
import { setupRouter } from './router'

import '@unocss/reset/tailwind.css'
import '@/assets/style/main.css'
import 'uno.css'

const app = createApp(App)
setupPinia(app)
setupRouter(app)
app.mount('#app')
