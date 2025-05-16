import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Get API URL from runtime config
const apiUrl = window.APP_CONFIG?.API_URL || import.meta.env.VITE_API_URL

// Create app with config
const app = createApp(App)
app.provide('apiUrl', apiUrl)
app.mount('#app')
