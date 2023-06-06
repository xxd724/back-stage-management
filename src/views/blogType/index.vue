<template>
  <div class="app-container">
    <div style="margin-top: 15px">
      <el-input
        v-model="input"
        placeholder="请输入要添加的分类，左边选择分类的等级"
        class="input-with-select"
      >
        <el-select slot="prepend" v-model="select" placeholder="请选择" class="select">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
          <el-option label="6" value="6" />
        </el-select>
      </el-input>
      <el-button type="primary" @click="addBlogType">添加</el-button>
    </div>
    <el-table
      :data="data"
      style="width: 100%; margin-top: 20px;"
      border
    >
      <el-table-column
        label="序号"
        width="100"
        align="center"
      >
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        label="博客类别"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        label="文章数量"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" style="margin-right:10px" @click="editBlogtype(scope.row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteBlogtype(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="请选择分类等级">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
            <el-option label="6" value="6" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmhandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBlogTypes, addBlogType, delBlogType, findOneBlogType, updateOneBlogType } from '@/api/blogType'
export default {
  data() {
    return {
      input: '',
      select: '1',
      data: [],
      dialogFormVisible: false,
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      await getBlogTypes().then(res => {
        this.data = res.data
      })
    },
    // 添加分类
    addBlogType() {
      if (this.input) {
        addBlogType({ name: this.input, order: this.select }).then(res => {
          this.fetchData()
          this.input = ''
          this.$message.success('添加分类成功')
        })
      } else {
        this.$message.error('分类名称不能为空')
      }
    },
    // 编辑分类
    editBlogtype(blogtypeinfo) {
      findOneBlogType(blogtypeinfo.id).then(res => {
        this.form = res.data
        this.dialogFormVisible = true
      })
    },
    // 删除分类
    deleteBlogtype(blogtypeinfo) {
      this.$confirm('删除该分类后，该分类下的所有文章将变成未分类状态，是否继续？', '删除该分类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          delBlogType(blogtypeinfo.id).then(() => {
            this.fetchData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 确认编辑
    confirmhandle() {
      updateOneBlogType({
        id: this.form.id,
        data: this.form
      }).then(() => {
        this.fetchData()
        this.$message.success('更新分类信息成功')
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-with-select{
    width: 400px;
    margin-right: 10px;
    .select{
        width:90px;
    }
}
</style>
