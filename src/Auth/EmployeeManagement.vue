<template>
    <div class="min-h-screen bg-gray-50">
      <!-- 顶部导航 -->
      <Navbar />
      <div style="height: 5vh;"></div>
      <!-- 主要内容区 -->
      <div class="pt-16 px-4 pb-20">
        <!-- 搜索栏 -->
        <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div class="flex items-center gap-4">
            <el-input
              v-model="searchText"
              placeholder="搜索员工姓名或工号"
              class="max-w-md"
              @keyup.enter="onSearch"
              prefix-icon="el-icon-search"
            ></el-input>
            <el-button type="primary" @click="showAddModal = true">
              添加员工
            </el-button>
          </div>
        </div>
    
        <!-- 员工列表 -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <el-table
            :data="employees"
            :pagination="{ pageSize: 10 }"
            class="w-full"
          >
            <el-table-column prop="employeeId" label="工号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="department" label="部门" />
            <el-table-column prop="position" label="职位" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作">
              <template #default="scope">
                <div class="space-x-2">
                  <el-button type="link" @click="handleEdit(scope.row)">
                    编辑
                  </el-button>
                  <el-button type="link" danger @click="handleDelete(scope.row)">
                    删除
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    
      <!-- 添加/编辑员工弹窗 -->
      <el-dialog
        v-model:visible="showAddModal"
        :title="editingEmployee ? '编辑员工' : '添加员工'"
        @confirm="handleSubmit"
        @cancel="resetForm"
        width="600px"
      >
        <el-form :model="formState" layout="vertical">
          <div class="grid grid-cols-2 gap-4">
            <el-form-item label="工号" prop="employeeId">
              <el-input v-model="formState.employeeId" placeholder="请输入工号" />
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formState.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="formState.idCard" placeholder="请输入身份证号" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formState.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <el-select v-model="formState.department" placeholder="请选择部门">
                <el-option value="技术部" label="技术部"></el-option>
                <el-option value="人力资源部" label="人力资源部"></el-option>
                <el-option value="市场部" label="市场部"></el-option>
                <el-option value="财务部" label="财务部"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="position">
              <el-select v-model="formState.position" placeholder="请选择职位">
                <el-option value="开发工程师" label="开发工程师"></el-option>
                <el-option value="产品经理" label="产品经理"></el-option>
                <el-option value="设计师" label="设计师"></el-option>
                <el-option value="运营专员" label="运营专员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统角色" prop="role">
            <el-select v-model="formState.role" placeholder="请选择系统角色">
              <el-option value="管理员" label="管理员"></el-option>
              <el-option value="普通用户" label="普通用户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前状态" prop="status">
            <el-select v-model="formState.status" placeholder="请选择状态">
              <el-option value="在职" label="在职"></el-option>
              <el-option value="离职" label="离职"></el-option>
              <el-option value="试用期" label="试用期"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职日期" prop="entryDate">
            <el-date-picker v-model="formState.entryDate" style="width: 100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="离职日期" prop="leaveDate">
            <el-date-picker v-model="formState.leaveDate" style="width: 100%"></el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="联系地址" prop="address">
          <el-input
            type="textarea"
            v-model="formState.address"
            rows="2"
            placeholder="请输入联系地址"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  
    <!-- 批量导入弹窗 -->
    <el-dialog
      v-model:visible="showImportModal"
      title="批量导入"
      @confirm="handleImport"
      @cancel="showImportModal = false"
    >
      <el-upload-dragger
        action="/upload"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :before-upload="beforeUpload"
        :file-list="fileList"
      >
        <i class="el-icon-inbox"></i>
        <div class="el-upload__text">点击或拖拽文件到此区域上传</div>
        <div class="el-upload__hint">支持 .xlsx, .xls 格式的Excel文件</div>
      </el-upload-dragger>
    </el-dialog>
  
    <!-- 底部工具栏 -->
    <Bottombar />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import dayjs from 'dayjs'; // 确保你已经安装了dayjs
import Navbar from '@/components/layout/Navbar.vue';
import Bottombar from '@/components/layout/Bottombar.vue';

export default defineComponent({
  components: {
    Navbar,
    Bottombar,
    ElForm
  },
  setup() {
    const avatarUrl = 'https://ai-public.mastergo.com/ai/img_res/a9236609cf629441425c1228db3ca563.jpg';

    const searchText = ref('');
    const showAddModal = ref(false);
    const showImportModal = ref(false);
    const editingEmployee = ref(null);
    const fileList = ref([]);

    const formState = reactive({
      employeeId: '',
      name: '',
      department: '',
      idCard: '',
      phone: '',
      position: '',
      role: '',
      status: '',
      address: '',
      entryDate: null,
      leaveDate: null,
    });

    const employees = ref([
      { key: '1', employeeId: 'EMP001', name: '陈思远', department: '技术部', position: '开发工程师', status: '在职' },
      { key: '2', employeeId: 'EMP002', name: '林美玲', department: '人力资源部', position: '人力资源专员', status: '在职' },
      { key: '3', employeeId: 'EMP003', name: '王建国', department: '市场部', position: '市场经理', status: '在职' },
    ]);

    const onSearch = (value: string) => {
      ElMessage.info(`搜索: ${value}`);
    };

    const handleEdit = (record: any) => {
      editingEmployee.value = record;
      Object.assign(formState, record);
      showAddModal.value = true;
    };

    const handleDelete = (record: any) => {
      employees.value = employees.value.filter((item: any) => item.key !== record.key);
      ElMessage.success('删除成功');
    };

    const handleSubmit = () => {
      if (editingEmployee.value) {
        const index = employees.value.findIndex((item: any) => item.key === editingEmployee.value.key);
        employees.value[index] = { ...employees.value[index], ...formState };
        ElMessage.success('编辑成功');
      } else {
        const newEmployee = {
          key: `${employees.value.length + 1}`,
          ...formState,
        };
        employees.value.push(newEmployee);
        ElMessage.success('添加成功');
      }
      resetForm();
    };

    const resetForm = () => {
      editingEmployee.value = null;
      Object.assign(formState, {
        employeeId: '',
        name: '',
        department: '',
        idCard: '',
        phone: '',
        position: '',
        role: '',
        status: '',
        address: '',
        entryDate: null,
        leaveDate: null,
      });
      showAddModal.value = false;
    };

    const handleUploadChange = (info: any) => {
      if (info.file.status === 'done') {
        ElMessage.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        ElMessage.error(`${info.file.name} 文件上传失败`);
      }
    };

    const handleImport = () => {
      ElMessage.success('导入成功');
      showImportModal.value = false;
      fileList.value = [];
    };

    const handleUploadSuccess = (response: any, file: any, fileList: any[]) => {
      // Handle upload success
    };

    const handleUploadError = (err: any, file: any, fileList: any[]) => {
      // Handle upload error
    };

    const beforeUpload = (file: File) => {
      // Perform actions before upload
      return true; // If return false, the upload will be aborted
    };

    return {
      searchText,
      showAddModal,
      showImportModal,
      editingEmployee,
      fileList,
      formState,
      employees,
      onSearch,
      handleEdit,
      handleDelete,
      handleSubmit,
      resetForm,
      handleUploadChange,
      handleImport,
      handleUploadSuccess,
      handleUploadError,
      beforeUpload
    };
  }
});
</script>

<style>
.el-upload-dragger {
  font-size: 48px;
  color: #40a9ff;
}

.el-upload-text {
  margin: 0 0 4px;
  color: #000000d9;
  font-size: 16px;
}

.el-upload-hint {
  color: #00000073;
  font-size: 14px;
}
</style>