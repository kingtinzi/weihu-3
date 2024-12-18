<template>
    <div class="login-container flex flex-col justify-center items-center h-screen bg-gray-50 p-4">
      <!-- 顶部Logo区域 -->
      <div class="logo-section mb-8 text-center">
        <img 
          src="@/assets/logo.svg" 
          alt="微鹄科技" 
          class="mx-auto w-16 h-16 mb-2"
        />
        <h1 class="text-2xl font-bold text-gray-800">微鹄科技</h1>
      </div>
  
      <!-- 登录表单 -->
      <div class="login-form w-full max-w-md">
        <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded-lg p-6">
          <!-- 手机号输入 -->
          <div class="mb-4">
            <input 
              type="tel" 
              v-model="loginForm.mobile"
              placeholder="请输入手机号"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{'border-red-500': mobileError}"
            />
            <p v-if="mobileError" class="text-red-500 text-sm mt-1">
              {{ mobileError }}
            </p>
          </div>
  
          <!-- 密码输入 -->
          <div class="mb-4 relative">
            <input 
              :type="passwordVisible ? 'text' : 'password'"
              v-model="loginForm.password"
              placeholder="请输入密码"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              :class="{'border-red-500': passwordError}"
            />
            
            <!-- 密码可见性切换 -->
            <button 
              type="button" 
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <EyeIcon 
                :class="passwordVisible ? 'text-blue-500' : 'text-gray-400'"
              />
            </button>
  
            <p v-if="passwordError" class="text-red-500 text-sm mt-1">
              {{ passwordError }}
            </p>
          </div>
  
          <!-- 登录按钮 -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            :class="{
              'opacity-50 cursor-not-allowed': isLoading,
              'bg-blue-500 hover:bg-blue-600': !isLoading
            }"
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
  
  interface LoginResponse {
  success: boolean;
  token: string;
}
  // 密码可见性切换
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value
  }
  
  // 登录处理
  const handleLogin = async () => {
    // 重置错误信息
    mobileError.value = ''
    passwordError.value = ''
  
    // 表单验证
    if (!validateForm()) return
  
    try {
      isLoading.value = true
      
      // 模拟登录请求
      const result = await loginRequest(loginForm)
      
      if (result.success) {
        // 登录成功，跳转到首页
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
  
    // 手机号验证
    if (!loginForm.mobile) {
      mobileError.value = '请输入手机号'
      isValid = false
    } else if (!/^1[3-9]\d{9}$/.test(loginForm.mobile)) {
      mobileError.value = '请输入正确的手机号'
      isValid = false
    }
  
    // 密码验证
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
      // 其他错误可以使用toast或全局提示
      console.error(errorMessage)
    }
  }
  
  // 模拟登录请求
//   const loginRequest = async (form: LoginForm): Promise<LoginResponse> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ 
//         success: true, 
//         token: 'mock-token' 
//       })
//     }, 1000)
//   })
// }

const loginRequest = async (form: LoginForm): Promise<LoginResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟成功登录
      if (form.mobile === '12345678901' && form.password === 'password') {
        resolve({ 
          success: true, 
          token: 'mock-token' 
        });
      } else {
        resolve({ 
          success: false, 
          token: '' 
        });
      }
    }, 1000);
  });
}

  </script>