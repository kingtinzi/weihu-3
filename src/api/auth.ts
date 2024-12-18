import axios from 'axios'
import { UserInfo } from '@/types/user' 
interface LoginParams {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  userInfo: UserInfo
}

export const loginApi = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await axios.post('/api/login', params)
  return response.data
}

export const getUserInfoApi = async (): Promise<UserInfo> => {
  const response = await axios.get('/api/userinfo')
  return response.data
} 