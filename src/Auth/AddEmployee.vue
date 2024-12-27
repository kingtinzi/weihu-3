<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <h2 class="modal-title">添加员工</h2>
      <form @submit.prevent="submitForm" class="modal-form">
        <!-- 使用 .form-row 容器来包裹每对 .form-group -->
        <div class="form-row">
          <div class="form-group">
            <label for="employeeId">工号</label>
            <input 
              type="text" 
              id="employeeId" 
              v-model="formData.employeeId"
              placeholder="请输入工号" 
              :class="{'error': errors.employeeId}"
              required
            >
            <span class="error-message" v-if="errors.employeeId">{{ errors.employeeId }}</span>
          </div>
          <div class="form-group">
            <label for="employeeName">姓名</label>
            <input 
              type="text" 
              id="employeeName" 
              v-model="formData.name"
              placeholder="请输入姓名" 
              :class="{'error': errors.name}"
              required
            >
            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="department">部门</label>
            <select 
              id="department" 
              v-model="formData.department"
              :class="{'error': errors.department}"
              required
            >
              <option value="">请选择部门</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
            <span class="error-message" v-if="errors.department">{{ errors.department }}</span>
          </div>
          <div class="form-group">
            <label for="position">职位</label>
            <input 
              type="text" 
              id="position" 
              v-model="formData.position"
              placeholder="请输入职位"
              :class="{'error': errors.position}"
              required
            >
            <span class="error-message" v-if="errors.position">{{ errors.position }}</span>
          </div>
        </div>

        <!-- 以下为新添加的字段，也按照两列布局 -->
        <div class="form-row">
          <div class="form-group">
            <label for="hireDate">入职时间</label>
            <input 
              type="date" 
              id="hireDate" 
              v-model="formData.hireDate"
              :class="{'error': errors.hireDate}"
              required
            >
            <span class="error-message" v-if="errors.hireDate">{{ errors.hireDate }}</span>
          </div>
          <div class="form-group">
            <label for="companyName">企业名称</label>
            <input 
              type="text" 
              id="companyName" 
              v-model="formData.companyName"
              placeholder="请输入企业名称" 
              :class="{'error': errors.companyName}"
              required
            >
            <span class="error-message" v-if="errors.companyName">{{ errors.companyName }}</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="address">联系地址</label>
            <input 
              type="text" 
              id="address" 
              v-model="formData.address"
              placeholder="请输入联系地址" 
              :class="{'error': errors.address}"
              required
            >
            <span class="error-message" v-if="errors.address">{{ errors.address }}</span>
          </div>
          <div class="form-group">
            <label for="status">在职状态</label>
            <select 
              id="status" 
              v-model="formData.status"
              :class="{'error': errors.status}"
              required
            >
              <option value="">请选择在职状态</option>
              <option value="onboard">在职</option>
              <option value="resigned">离职</option>
            </select>
            <span class="error-message" v-if="errors.status">{{ errors.status }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="leaveDate">入职日期</label>
          <input 
            type="date" 
            id="leaveDate" 
            v-model="formData.leaveDate"
          >
          <!-- 错误信息展示，如果有的话 -->
          <span class="error-message" v-if="errors.leaveDate">{{ errors.leaveDate }}</span>
        </div>
         <!-- 新增汇报对象栏 -->
         <div class="form-group">
          <label for="reportingObjects">汇报对象</label>
          <input 
            type="text" 
            id="reportingObjects" 
            v-model="formData.reportingObjects"
            placeholder="请输入汇报对象，例如：@1234/张三, @5678/李四"
            :class="{'error': errors.reportingObjects}"
          > <span class="error-message" v-if="errors.reportingObjects">{{ errors.reportingObjects }}</span>
        </div>
        <div class="button-group">
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? '提交中...' : '提交' }}
          </button>
          <button type="button" class="cancel-btn" @click="handleClose">取消</button>
        </div>
      </form>
    </div>
    <div class="modal-overlay" @click="handleClose"></div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import axios from 'axios'

export default {
  name: 'AddEmployee',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  
  setup(props, { emit }) {
    const formData = reactive({
      employeeId: '',
      name: '',
      department: '',
      position: '',
      hireDate: '',
      companyName: '',
      address: '',
      leaveDate: '',
      status: ''
    })
    
    const errors = reactive({})
    const isSubmitting = ref(false)
    const departments = ['技术部', '市场部', '运营部', '人事部', '财务部']

    const validateForm = () => {
      const newErrors = {}
      
      // 省略其他验证逻辑，保留与新增字段相关的验证
      if (!formData.hireDate) {
        newErrors.hireDate = '请选择入职时间'
      }
      if (!formData.companyName) {
        newErrors.companyName = '请输入企业名称'
      }
      if (!formData.address) {
        newErrors.address = '请输入联系地址'
      }
      if (formData.status === '') {
        newErrors.status = '请选择在职状态'
      }

      Object.assign(errors, newErrors)
      return Object.keys(newErrors).length === 0
    }

    const submitForm = async () => {
      if (!validateForm()) return
      
      try {
        isSubmitting.value = true
        const response = await axios.post('/api/employees', formData)
        
        if (response.data.success) {
          emit('submit-success', response.data.employee)
          handleClose()
        }
      } catch (error) {
        console.error('添加员工失败:', error)
        alert('添加员工失败，请重试')
      } finally {
        isSubmitting.value = false
      }
    }

    const handleClose = () => {
      emit('update:isVisible', false)
      // 重置表单
      Object.keys(formData).forEach(key => formData[key] = '')
      Object.keys(errors).forEach(key => delete errors[key])
    }

    return {
      formData,
      errors,
      isSubmitting,
      departments,
      submitForm,
      handleClose
    }
  }
}
</script>

<style scoped>
/* ... 现有的样式 ... */

/* 新增样式，用于一行内放置两个输入框 */
.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.form-row .form-group {
  flex: 1; /* 使两个输入框平分空间 */
  margin-right: 0.5rem; /* 添加一些间隔 */
}

/* 最后一行的右边距可能需要调整为0 */
.form-row .form-group:last-child {
  margin-right: 0;
}

/* 确保输入框和选择器的宽度正确 */
.form-group input,
.form-group select {
  width: 100%;
  /* ... 其他样式 ... */
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  z-index: 1001;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group input.error,
.form-group select.error {
  border-color: #dc2626;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.submit-btn {
  background-color: #3b82f6;
  color: white;
}

.submit-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #ef4444;
  color: white;
}
</style>