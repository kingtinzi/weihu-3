import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/Auth/Login.vue'  // 导入Login组件
import { useUserStore } from '@/store/modules/user'

// 定义路由规则
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false  // 标记该页面不需要认证
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
  // ... 其他路由配置
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const isAuthenticated = userStore.isLoggedIn
    
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login') // 未认证用户重定向到登录页
    } else {
      next() // 允许访问
    }
  })

export default router