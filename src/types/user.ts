// 用户信息接口
export interface UserInfo {
    id: number;
    name: string;
    phone: string;
    email: string;
    // 其他用户信息字段
  }
  
  // 用户状态接口
  export interface UserState {
    token: string;
    userInfo: UserInfo | null;
  }