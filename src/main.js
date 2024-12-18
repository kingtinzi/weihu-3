import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // 导入 Pinia

const app = createApp(App)
const pinia = createPinia() // 创建 Pinia 实例

app.use(pinia) // 注册 Pinia
app.use(router) // 注册路由
app.mount('#app')