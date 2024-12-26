   <!-- src/Main.vue -->
   <template>
    <div id="app">
      <!-- <Navbar v-if="showNavbar"/> -->
      <router-view></router-view> <!-- 用于渲染路由组件 -->
    </div>
  </template>

<script setup>
import { useUserStore } from '@/store/modules/user' // 导入状态管理
import { onMounted } from 'vue'

// 获取用户状态
const userStore = useUserStore()

// 在组件挂载时获取用户信息
onMounted(async () => {
  if (userStore.isLoggedIn) {
    await userStore.getUserInfoAction() // 获取用户信息
  }
})
</script>

  <style>
  /* 全局样式 */
  </style>