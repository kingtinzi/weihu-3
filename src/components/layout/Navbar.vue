<template>
    <div class="navbar">
      <div class="navbar-left">
        <img src="@/assets/logo.png" alt="Company Logo" class="logo" />
        <span class="company-name">{{ companyName }}</span>
        <div v-if="isSuperAdmin" class="dropdown" @click="toggleDropdown">
          <span class="triangle">▼</span>
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div v-for="company in companies" :key="company" @click="selectCompany(company)">
              {{ company }}
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-right">
        <div class="user-info">
          <img src="@/assets/logo.png" alt="User Avatar" class="avatar" />
          <span class="user-name">{{ userName }}</span>
        </div>
        <button class="logout-btn" @click="confirmLogout">
          <span class="icon">&#x23FB;</span>
        </button>
      </div>
      <div v-if="isDropdownOpen" class="overlay" @click="closeDropdown"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        companyLogo: '/home/devbox/project/src/assets/logo.png',
        companyName: '微鸽科技',
        isSuperAdmin: true,
        isDropdownOpen: false,
        companies: ['智慧科技有限公司', '来谷科技投资咨询管理有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司','微鸽科技信息有限公司'],
        userAvatar: '/home/devbox/project/src/assets/logo.png',
        defaultAvatar: '/home/devbox/project/src/assets/logo.png',
        userName: '张晓杰'
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      closeDropdown() {
        this.isDropdownOpen = false;
      },
      selectCompany(company) {
        alert(`Selected company: ${company}`);
        this.closeDropdown();
      },
      confirmLogout() {
        if (confirm('确定要登出吗？')) {
          alert('登出成功');
          // 这里可以添加实际的登出逻辑
        }
      }
    }
  };
  </script>



  <style scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .company-name {
    font-weight: bold;
    margin-left: 10px;
  }
  
  .dropdown {
    position: relative;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .triangle {
    color: #999;
    font-size: 12px;
  }
  
  .triangle:hover {
    color: #333;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 150px;
    max-height: 200px; /* 设置最大高度 */
    overflow-y: auto; /* 允许垂直滚动 */
}

.dropdown-menu div {
    padding: 10px;
    cursor: pointer;
    white-space: nowrap; /* 防止文本换行 */
}

.dropdown-menu div:hover {
    background-color: #F8F8F8;
}
  
  .navbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .user-name {
    font-size: 14px;
    color: #333333;
    margin-left: 10px;
  }
  
  .logout-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #333333;
    transition: color 0.3s ease; /* 添加颜色变化的过渡效果 */
}

.logout-btn:hover {
    color: #FF0000; /* 鼠标悬停时变为红色 */
}
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
    z-index: 999; /* 确保遮罩层在最上层 */
    display: none; /* 默认隐藏 */
    transition: opacity 0.3s ease; /* 平滑过渡效果 */
}

.overlay.active {
    display: block; /* 激活时显示 */
    opacity: 1; /* 完全可见 */
}
</style>