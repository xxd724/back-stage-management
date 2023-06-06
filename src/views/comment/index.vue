<template>
  <div class="app-contianer">
    <el-table v-loading="loading" :data="data" highlight-current-row fit element-loading-text="数据加载中" style="width: 100%" border>
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * limit + 1 }}</template>
      </el-table-column>
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-avatar shape="square" size="small" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column label="评论文章" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.blog.title }}</template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">{{ scope.row.content }}</template>
      </el-table-column>
      <el-table-column label="评论日期" align="center" width="200">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteOneComment(scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      background
      layout="prev, pager, next,total,->,sizes,jumper"
      :total="total"
      :page-size="limit"
      :page-sizes="[10, 15, 20]"
      :current-page="currentPage"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import { getComments, delOneComment } from '@/api/comment'
import { formatDate } from '@/utils/tools'
export default {
  data() {
    return {
      data: [],
      currentPage: 1, // 当前页
      total: 0, // 总数据量
      limit: 10 // 页容量
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    formatDate,
    fetchData() {
      getComments(this.currentPage, this.limit).then(({ data }) => {
        this.data = data.rows
        this.total = data.total
        const countPages = Math.ceil(this.total / this.limit) // 总页数
        if (countPages < this.currentPage) {
          this.currentPage = countPages
          this.fetchData()
        }
      })
    },
    deleteOneComment(commentInfo) {
      this.$confirm('是否删除此评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          delOneComment(commentInfo.id).then(() => {
            this.fetchData(this.currentChange, this.limit)
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
    sizeChange(info) {
      this.currentPage = 1
      this.limit = info
      this.fetchData(this.currentPage, info)
    },
    currentChange(info) {
      this.currentPage = info
      this.fetchData(this.currentPage, this.limit)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
