// 导入 Pinia 的 defineStore 方法，用于创建一个新的 store
import { defineStore } from 'pinia'
// 导入 UserState 和 UserInfo 类型定义，确保类型安全
import { UserState, UserInfo } from '@/types/user' 
import { loginApi, getUserInfoApi } from '@/api/auth'

// 定义一个名为 'user' 的 Pinia store
export const useUserStore = defineStore('user', {
   // 定义 store 的状态
    state: (): UserState => ({
        // 从 localStorage 获取 token，若不存在则默认为空字符串
    token: localStorage.getItem('token') || '',
    userInfo: null
  }),
  
  // 定义计算属性（getters）
  getters: {
    // 判断用户是否已登录，通过检查是否存在 token
    isLoggedIn: (state) => !!state.token,
      // 获取当前的 token
    getToken: (state) => state.token,
     // 获取当前的用户信息
    getUserInfo: (state) => state.userInfo
  },
  
  actions: {
    // 设置token，并将其存储到 localStorage
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    // 设置用户信息
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    
    //**
    //用户登录方法，调用登录 API 并设置 token 和用户信息
    //@param username - 用户名
    // @param password - 密码
    //* @returns 登录是否成功//
    
    async login(username: string, password: string) {
      try {
        // 这里调用登录API
        const { token, userInfo } = await loginApi({ username, password })
        this.setToken(token)
        this.setUserInfo(userInfo)
        return true
      } catch (error) {
        // 登录失败，返回 false
        return false
      }
    },
    
    // 登出
    logout() {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('token')
    },
    
    // 获取用户信息
    async getUserInfoAction() {
      try {
        const userInfo = await getUserInfoApi()
        this.setUserInfo(userInfo)
        return userInfo
      } catch (error) {
        return null
      }
    }
  }
})