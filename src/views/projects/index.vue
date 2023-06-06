<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      :data="data"
      style="width: 100%"
      border
      :highlight-current-row="true"
      element-loading-text="数据加载中"
      fit
    >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="项目名称" width="250" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="预览图" width="250" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 230px;"
            :src="scope.row.thumb"
            fit="contain"
            :preview-src-list="thumblist"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="github" placement="top">
            <el-button type="info" icon="iconfont icon-github-fill" circle size="mini" @click="opengithubHandle(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editprojectHandle(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteprojectHandle(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请编辑项目信息" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" placeholder="请填写项目名称" />
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分隔）">
          <el-input v-model="form.description" placeholder="请填写项目描述" />
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmProjectHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProjects, delOneProject, updateProject } from '@/api/project'
import Upload from '@/components/Upload'
export default {
  components: {
    Upload
  },
  data() {
    return {
      data: [],
      loading: false,
      thumblist: [],
      dialogFormVisible: false,
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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getProjects().then(res => {
        this.data = res.data
        this.loading = false
        for (const item of this.data) {
          item.description = item.description.toString()
          this.thumblist.push(item.thumb)
        }
      })
    },
    opengithubHandle(projectInfo) {
      window.open(projectInfo.github, '_blank')
    },
    editprojectHandle(projectInfo) {
      this.dialogFormVisible = true
      this.form = { ...projectInfo }
    },
    deleteprojectHandle(projectInfo) {
      this.$confirm('是否继续删除此项目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        delOneProject(projectInfo.id).then(() => {
          this.fetchData()
          this.$message.success('项目删除成功')
        })
      })
    },
    confirmProjectHandle() {
      const obj = { ...this.form }
      obj.description = this.form.description.split(',')
      obj.order = parseInt(this.form.order)
      updateProject(obj.id, obj).then(res => {
        this.dialogFormVisible = false
        this.fetchData()
        this.$message.success('项目修改成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
