import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // 导入 Pinia

import { ElIcon } from 'element-plus';
import 'element-plus/dist/index.css'; 

const app = createApp(App)
const pinia = createPinia() // 创建 Pinia 实例

app.component('ElIcon', ElIcon);

app.use(pinia) // 注册 Pinia
app.use(router) // 注册路由
app.mount('#app')