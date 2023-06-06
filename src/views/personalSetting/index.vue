<template>
  <div class="app-container">
    <el-form
      ref="adminform"
      :model="adminInfo"
      label-width="100px"
      width="500px"
      :rules="setRules"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="adminInfo.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="登录名" prop="loginId">
        <el-input v-model="adminInfo.loginId" placeholder="请输入登录名" />
      </el-form-item>
      <el-form-item label="旧密码" prop="oldLoginPwd">
        <el-input v-model="adminInfo.oldLoginPwd" type="password" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="loginPwd">
        <el-input v-model="adminInfo.loginPwd" type="password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="新密码确认" prop="loginPwdConfirm">
        <el-input v-model="adminInfo.loginPwdConfirm" type="password" placeholder="请确认新密码" />
      </el-form-item>
    </el-form>
    <el-button type="info" @click="backhandle">返回</el-button>
    <el-button type="primary" @click.native.prevent="modifyHandle">修改</el-button>
  </div>
</template>

<script>
import { getInfo, setUser } from '@/api/user'
export default {
  data() {
    const validate = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.adminInfo.loginPwd) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      adminInfo: {
        name: '',
        loginId: '',
        oldLoginPwd: '',
        loginPwd: '',
        loginPwdConfirm: ''
      },
      setRules: {
        name: [{
          required: true, trigger: 'blur', message: '用户名不能为空'
        }],
        loginId: [{
          required: true, trigger: 'blur', message: '登录名不能为空'
        }],
        oldLoginPwd: [{
          required: true, trigger: 'blur', message: '请输入旧密码'
        }],
        loginPwd: [{
          required: true, trigger: 'blur', message: '请输入新密码'
        }],
        loginPwdConfirm: [{
          required: true, trigger: 'blur', message: '请确认新密码'
        },
        { validator: validate, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getInfo().then(({ data }) => {
        this.adminInfo = data
      })
    },
    backhandle() {
      this.$router.push('/')
    },
    modifyHandle() {
      this.$refs.adminform.validate((valid) => {
        if (valid) {
          setUser(this.adminInfo).then(() => {
            this.$message.success('修改成功')
            this.$store.dispatch('user/logout').then(() => {
              this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            })
          })
        } else {
          this.$message.error('请填写所有的项目')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  width: 500px;
}
</style>
