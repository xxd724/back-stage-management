<template>
  <div class="app-container">
    <div class="block">编辑项目信息</div>
    <el-form :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" placeholder="请填写项目名称" />
      </el-form-item>
      <el-form-item label="项目描述（每一项描述以英文逗号分隔）">
        <el-input v-model="form.description" placeholder="请填写项目描述,每一项描述以英文逗号分隔" />
      </el-form-item>
      <el-form-item label="项目链接">
        <el-input v-model="form.url" placeholder="请填写项目链接" />
      </el-form-item>
      <el-form-item label="github地址">
        <el-input v-model="form.github" placeholder="请填写github地址" />
      </el-form-item>
      <el-form-item label="预览图">
        <Upload v-model="form.thumb" />
      </el-form-item>
      <el-form-item label="排序等级">
        <el-select v-model="form.order" placeholder="分类等级">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" round @click="addProjectHandle">添加项目</el-button>
  </div>
</template>

<script>
import { addProject } from '@/api/project'
import Upload from '@/components/Upload'
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        url: '',
        github: '',
        thumb: '',
        order: '1'
      }
    }
  },
  methods: {
    addProjectHandle() {
      const obj = { ...this.form }
      obj.description = this.form.description.split(',')
      obj.order = parseInt(this.form.order)
      addProject(obj).then(() => {
        this.$router.push('/projectsList')
        this.$message.success('项目添加成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
    margin: 20px 0;
    font-weight: bold;
}
</style>
