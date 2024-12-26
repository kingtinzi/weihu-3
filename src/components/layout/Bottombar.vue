<template>
    <div class="bottom-navbar">
      <div class="nav-item" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')">
        <el-icon :size="24"><HomeFilled /></el-icon>
        <span class="nav-label">首页</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'apps' }" @click="setActiveTab('apps')">
        <el-icon :size="24"><Grid /></el-icon>
        <span class="nav-label">应用</span>
      </div>
      <div class="nav-item" :class="{ active: activeTab === 'profile' }" @click="setActiveTab('profile')">
        <el-icon :size="24"><User /></el-icon>
        <span class="nav-label">我的</span>
      </div>
    </div>
  </template>
  
  <script>
  import { ElIcon } from 'element-plus';
  import { HomeFilled, Grid, User } from '@element-plus/icons-vue';
  
  export default {
    name: 'BottomNavbar',
    components: {
      ElIcon,
      HomeFilled,
      Grid,
      User,
    },
    data() {
      return {
        activeTab: 'home',
      };
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      },
    },
  };
  </script>
  
  <style scoped>
  .bottom-navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 56px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #E0E0E0;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .nav-item.active .el-icon,
  .nav-item.active .nav-label {
    color: #2196F3;
  }
  
  .nav-item:active {
    transform: scale(0.95);
  }
  
  .nav-label {
    font-size: 12px;
    color: #999999;
  }
  
  .nav-item.active .nav-label {
    color: #2196F3;
  }
  
  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    .bottom-navbar {
      background-color: #121212;
      border-top: 1px solid #333333;
    }
  
    .nav-label {
      color: #666666;
    }
  
    .nav-item.active .el-icon,
    .nav-item.active .nav-label {
      color: #64B5F6;
    }
  }
  
  /* iPhone Safe Area Support */
  .bottom-navbar {
    padding-bottom: env(safe-area-inset-bottom);
  }
  </style>