<template>
  <el-form class="form" :model="loginForm" ref="loginFormRef" :rules="rules" label-width="72px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin(loginFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Hashes from 'jshashes'
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
import { LOGIN_ACTION } from '@/store/constants'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()

    const loginFormRef = ref<FormInstance>()
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const rules = reactive<FormRules>({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })

    const handleLogin = async (formEl: FormInstance | undefined) => {
      try {
        await formEl?.validate()
        const SHA256 = new Hashes.SHA256()
        const params = {
          username: loginForm.username,
          password: SHA256.hex(loginForm.password)
        }
        await store.dispatch(LOGIN_ACTION, params)
      } catch (error) {
        console.log(error)
      }
    }

    return {
      loginFormRef,
      loginForm,
      rules,
      handleLogin
    }
  }
})
</script>

<style scoped lang="scss">
.form {
  width: 300px;
  margin: 200px auto;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 2px 16px rgba(72, 74, 119, 0.2);
}
</style>
