import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import store from "./store"
import router from "./router"

createApp(App).use(store).use(router).mount('#app')
import "bootstrap/dist/js/bootstrap.js"