<template>
  <div class="home-page">
    <!-- 使用 Navbar 组件 -->
    <Navbar />
    <main class="pt-14 md:pt-16 md:pl-64">
      <div style="height: 5vh;"></div>
      <div class="p-4 md:p-6">
        <!-- 管理员权限应用 -->
        <section class="mb-8">
          <h3 class="text-lg font-medium mb-4">管理员权限应用</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="app in adminApps" :key="app.id" 
                 class="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start">
                <img :src="app.icon" :alt="app.name" class="w-10 md:w-12 h-10 md:h-12 rounded-lg object-cover">
                <div class="ml-4 flex-1">
                  <h4 class="text-base md:text-lg font-medium">{{ app.name }}</h4>
                </div>
              </div>
              <button class="mt-4 w-full bg-blue-500 text-white py-2 !rounded-button whitespace-nowrap">
                立即访问
              </button>
            </div>
          </div>
        </section>
        <!-- 核心应用权限 -->
        <section>
          <h3 class="text-lg font-medium mb-4">核心应用权限</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="app in coreApps" :key="app.id" 
                 class="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start">
                <img :src="app.icon" :alt="app.name" class="w-10 md:w-12 h-10 md:h-12 rounded-lg object-cover">
                <div class="ml-4 flex-1">
                  <h4 class="text-base md:text-lg font-medium">{{ app.name }}</h4>
                </div>
              </div>
              <button class="mt-4 w-full bg-blue-500 text-white py-2 !rounded-button whitespace-nowrap">
                立即访问
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Bottombar />
  </div>
</template>

<script>
// 导入 Navbar 组件
import Navbar from '@/components/layout/Navbar.vue';
import Bottombar from '@/components/layout/Bottombar.vue'

export default {
  name: 'Home', // 组件名称
  components: {
    Navbar, // 注册 Navbar 组件
    Bottombar, // 注册 Bottombar 组件
  },
};
</script>

<style scoped>
.el-menu {
  border-right: none;
}
</style>

<script setup>
import { ref } from 'vue';
import { Bell, Setting, UserFilled, User, Menu, Document, Money, Wallet } from '@element-plus/icons-vue';

const logoUrl = 'https://ai-public.mastergo.com/ai/img_res/6dfd7ebaea7834cdbf9755b2b58bd538.jpg';
const avatarUrl = 'https://ai-public.mastergo.com/ai/img_res/a70c118df59efa4ce84701bb5cd48dc9.jpg';

const activeMenu = ref('1');
const isMenuOpen = ref(false);

const adminApps = [
  {
    id: 1,
    name: '员工管理',
    icon: 'https://ai-public.mastergo.com/ai/img_res/c3cff4b1d935bf19794a70b5f0d64d13.jpg'
  },
  {
    id: 2,
    name: '企业信息管理',
    icon: 'https://ai-public.mastergo.com/ai/img_res/ac5f7c4f674150844475c70038fdac6a.jpg'
  }
];

const coreApps = [
  {
    id: 3,
    name: '合同管理',
    icon: 'https://ai-public.mastergo.com/ai/img_res/44cd525763d6147b5a69c0be9ffea9c4.jpg'
  },
  {
    id: 4,
    name: '支付申请',
    icon: 'https://ai-public.mastergo.com/ai/img_res/df6937f42ddf320c16e91a3d3e5736fb.jpg'
  },
  {
    id: 5,
    name: '费用报销',
    icon: 'https://ai-public.mastergo.com/ai/img_res/10a50830fa09b71f5faf23e663749563.jpg'
  }
];
</script>

<style scoped>
/* 设置 .home-page 元素为垂直方向的弹性布局，高度为视口的100% */
.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

h4 {
  margin: 5px;
}

/* 设置 .content 元素为弹性布局，填充剩余空间，内边距为20px，文本居中 */
.content {
  flex: 1;
  padding: 10px;
  text-align: center;
  padding-top: 100px; /* 假设导航条高度为60px */
}

/* 设置 .grid 元素为网格布局，网格项之间的间距为1rem */
.grid {
  display: grid;
  gap: 1rem;
  place-items: center; /* 网格项居中 */
}

.grid-item {
  width: 100px; /* 网格项宽度 */
  height: 100px; /* 网格项高度 */
  background-color: #f0f0f0; /* 背景色 */
  display: flex;
  justify-content: center; /* 内容水平居中 */
  align-items: center; /* 内容垂直居中 */
}


/* 设置 .grid-cols-1 元素的网格为单列布局 */
.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

/* 在屏幕宽度大于等于640px时，设置 .sm\:grid-cols-2 元素的网格为两列布局 */
.sm\:grid-cols-2 {
  @media (min-width: 340px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 在屏幕宽度大于等于1024px时，设置 .lg\:grid-cols-3 元素的网格为三列布局 */
.lg\:grid-cols-3 {
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 设置 img 元素的宽度和高度为100px，保持图片比例并裁剪以适应尺寸 */
img {
  width: 100px;
  height: 100px;
  object-fit: cover; /* 保持图片比例并裁剪以适应尺寸 */
}
</style>