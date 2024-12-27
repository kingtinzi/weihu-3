<!-- src/Auth/EmployeeManagement.vue -->
<template>
  <!-- 顶部导航 -->
  <Navbar />  
  <div style="height: 10vh;"></div>
  
  <!-- 功能操作区 -->
  <div class="flex justify-between mb-4">
    <!-- 搜索框 -->
    <input type="text" placeholder="请输入员工姓名或工号" class="border p-2 rounded" v-model="searchQuery" />
    <button class="bg-blue-500 text-white p-2 rounded" icon="el-icon-search" @click="handleSearch">搜索</button>
    
    <!-- 操作按钮 -->
    <div class="flex items-center">
      <button class="bg-blue-500 text-white p-2 rounded mr-2" @click="openAddEmployeeModal">
        添加员工
      </button>
      <!-- <AddEmployee v-if="isAddEmployeeModalVisible" @close="isAddEmployeeModalVisible = false" /> -->
      <AddEmployee :is-visible="isAddEmployeeModalVisible"
        @update:is-visible="isAddEmployeeModalVisible = $event"
        @submit-success="handleEmployeeAdded"/>
      <button class="bg-green-500 text-white p-2 rounded" @click="openImportModal">
        批量导入
      </button>
    </div>
  </div>

  <!-- 员工列表展示区 -->
  <div class="table-container">
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2">工号</th>
          <th class="py-2">姓名</th>
          <th class="py-2">部门</th>
          <th class="py-2">职位</th>
          <th class="py-2">状态</th>
          <th class="py-2">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="index" class="hover:bg-gray-100">
          <td class="py-2">{{ employee.id }}</td>
          <td class="py-2">{{ employee.name }}</td>
          <td class="py-2">{{ employee.department }}</td>
          <td class="py-2">{{ employee.position }}</td>
          <td class="py-2">{{ employee.status }}</td>
          <td class="action-column">
            <button class="text-blue-500" @click="openEditEmployeeModal(employee)">编辑</button>
            <button class="text-red-500 ml-2" @click="confirmDelete(employee)">离职</button>
          </td>
        </tr>
      </tbody>
    </table> 
  </div>

  <!-- 加载更多按钮或提示 -->
  <div style="height: 10vh;">
    <div v-if="loadingMore" class="loading-text">加载更多...</div>
  </div>

  <!-- 底部工具栏 -->
  <Bottombar />
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import Bottombar from '@/components/layout/Bottombar.vue';
import AddEmployee from '@/Auth/AddEmployee.vue';

export default {
  name: 'EmployeeManagement',
  components: {
    Navbar,
    Bottombar,
    AddEmployee,
  },
  data() {
    return {
      employees: [
        { id: '001', name: '张三', department: '技术部', position: '前端开发', status: '在职' },
        // ... 其他员工数据
      ],
      searchQuery: '',
      loadingMore: false,
      page: 1,
      pageSize: 20,
      searchValue: '',
      isAddEmployeeModalVisible: true,
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted(){
    this.fetchEmployees();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openAddEmployeeModal() {
  console.log('Opening modal...');
  this.isAddEmployeeModalVisible = true;
  console.log('Modal visibility:', this.isAddEmployeeModalVisible);
},
    openEditEmployeeModal(employee) {
      // 打开编辑员工弹窗的逻辑
    },
    confirmDelete(employee) {
      if (confirm('确定要删除该员工吗？')) {
        this.employees = this.employees.filter(emp => emp.id !== employee.id);
      }
    },
    openImportModal() {
      // 打开批量导入弹窗的逻辑
    },
    fetchEmployees() {
      this.loadingMore = true;
      axios.get(`/api/employees?page=${this.page}&pageSize=${this.pageSize}`)
        .then(response => {
          this.employees = this.employees.concat(response.data.employees);
          this.page++;
          this.loadingMore = false;
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
          this.loadingMore = false;
        });
    },
    handleSearch() {
      // 现有搜索逻辑
    },
    handleAdvancedSearch() {
      // 高级搜索逻辑
    },
    handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        return;
      }
      this.fetchEmployees();
    },
    handleEmployeeAdded(newEmployee) {
      // 将新员工添加到列表中
      this.employees.unshift(newEmployee);
      // 可以显示一个成功提示
      alert('员工添加成功！');
    }
  }
}
</script>

<style scoped>
/* 容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* 搜索框样式 */
input[type="text"] {
  width: 300px;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: border-color 0.2s ease-in-out;
}

input[type="text"]:focus {
  outline: none;
  border-color: #3b82f6;
}

/* 操作按钮样式 */
button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}

button.bg-blue-500 {
  background-color: #3b82f6;
}

button.bg-blue-500:hover {
  background-color: #2563eb;
}

button.bg-green-500 {
  background-color: #10b981;
}

button.bg-green-500:hover {
  background-color: #059669;
}

/* 表格样式 */
.table-container {
  overflow-x: auto;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background-color: #f8fafc;
  font-weight: 600;
}

tr:hover {
  background-color: #f8fafc;
}

/* 操作按钮（编辑、删除）样式 */
button.text-blue-500 {
  color: #3b82f6;
}

button.text-blue-500:hover {
  color: #2563eb;
}

button.text-red-500 {
  color: #ef4444;
}

button.text-red-500:hover {
  color: #dc2626;
}

/* 分页按钮样式 */
button.bg-gray-200 {
  background-color: #edf2f7;
}

button.bg-gray-200:hover {
  background-color: #e2e8f0;
}

/* 容器样式 */
.flex {
  display: flex;
}

/* 元素右对齐 */
.justify-end {
  justify-content: flex-end;
}

/* 元素垂直居中 */
.items-center {
  align-items: center;
}

/* 输入框样式 */
.border {
  border: 1px solid #ccc;
}

.p-2 {
  padding: 0.5rem;
}

.rounded {
  border-radius: 0.25rem;
}

/* 按钮样式 */
.bg-blue-500 {
  background-color: #3490dc;
}

.bg-green-500 {
  background-color: #48bb78;
}

.text-white {
  color: white;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.loading-text {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #333;
  z-index: 1000;
}


</style>