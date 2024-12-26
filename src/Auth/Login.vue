<template>
  <div class="login-container">
    <div style="height: 10vh;"></div>
    
    <!-- Logo区域 -->
    <div class="logo-section">
      <img 
        src="@/assets/logo.png" 
        alt="微鹄科技" 
        class="logo-img" 
      />
      <h1 class="title">微鹄科技</h1>
    </div>

    <!-- 登录表单 -->
    <div class="login-form-container">
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- 手机号输入 -->
        <div class="input-item">
          <input 
            type="tel" 
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
            class="custom-input"
            :class="{'input-error': mobileError}"
          />
          <p v-if="mobileError" class="error-text">
            {{ mobileError }}
          </p>
        </div>

        <!-- 密码输入 -->
        <div class="input-item">
          <input 
            :type="passwordVisible ? 'text' : 'password'"
            v-model="loginForm.password"
            placeholder="请输入密码"
            class="custom-input"
            :class="{'input-error': passwordError}"
          />
          <button 
            type="button" 
            @click="togglePasswordVisibility"
            class="password-toggle"
          >
            <EyeIcon 
              :class="passwordVisible ? 'text-blue-500' : 'text-gray-400'"
            />
          </button>
          <p v-if="passwordError" class="error-text">
            {{ passwordError }}
          </p>
        </div>

        <!-- 登录按钮 -->
        <button 
          type="submit" 
          :disabled="isLoading"
          class="login-button"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import EyeIcon from "@/components/icons/EyeIcon.vue"

// 登录表单类型定义
interface LoginForm {
  mobile: string
  password: string
}

// 响应式状态
const loginForm = reactive<LoginForm>({
  mobile: '',
  password: ''
})

const router = useRouter()
const isLoading = ref(false)
const passwordVisible = ref(false)
const mobileError = ref('')
const passwordError = ref('')

// 密码可见性切换
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// 登录处理
const handleLogin = async () => {
  mobileError.value = ''
  passwordError.value = ''

  if (!validateForm()) return

  try {
    isLoading.value = true
    const result = await loginRequest(loginForm)
    
    if (result.success) {
      router.push('/dashboard')
    }
  } catch (error: any) {
    handleLoginError(error)
  } finally {
    isLoading.value = false
  }
}

// 表单验证
const validateForm = (): boolean => {
  let isValid = true

  if (!loginForm.mobile) {
    mobileError.value = '请输入手机号'
    isValid = false
  } else if (!/^1[3-9]\d{9}$/.test(loginForm.mobile)) {
    mobileError.value = '请输入正确的手机号'
    isValid = false
  }

  if (!loginForm.password) {
    passwordError.value = '请输入密码'
    isValid = false
  }

  return isValid
}

// 登录错误处理
const handleLoginError = (error: any) => {
  const errorMap: Record<string, string> = {
    'ACCOUNT_NOT_EXIST': '账号不存在',
    'PASSWORD_ERROR': '密码错误',
    'ACCOUNT_LOCKED': '账号已锁定',
    'NETWORK_ERROR': '网络异常'
  }

  const errorMessage = errorMap[error.code] || '登录失败，请重试'
  
  if (error.code === 'PASSWORD_ERROR') {
    passwordError.value = errorMessage
  } else {
    console.error(errorMessage)
  }
}

interface LoginResponse {
       success: boolean
       token: string
     }
// 模拟登录请求
import axios from 'axios'


const loginRequest = async (form: LoginForm): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('/api/login', {
      mobile: form.mobile,
      password: form.password,
    })
    return response.data
  } catch (error) {
    throw error
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh; /* 确保页面高度占满视口 */
  width: 100;
  background: linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%); /* 背景渐变 */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; /* 禁用横向和纵向滚动 */
}

.logo-section {
  text-align: center;
}

.logo-img {
  width: 80px;
  height: 80px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.login-form-container {
  width: 100%;
  /* max-width: 400px; */
  margin-bottom: 50vh; /* 留出50%空白区域 */  

}

.login-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: transparent; /* 背景透明 */
}

.input-item {
  margin-bottom: 15px;
  align-items: center;
}

.custom-input {
  width: 350PX; /* 输入框宽度为80% */
  height: 48px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #E0E0E0;
  padding: 0 15px;  
}

.input-error {
  border-color: #FF4D4F;
}

.error-text {
  color: #FF4D4F;
  font-size: 12px;
  margin-top: 5px;
  padding: 0 15px;
}

.login-button {
  width: 350px; /* 登录按钮宽度为80% */
  height: 48px;
  background-color: #1890FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10%; /* 左右各留10%空白 */
  margin-right: 10%;
  
}

.login-button:hover {
  background-color: #40A9FF;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}
</style>