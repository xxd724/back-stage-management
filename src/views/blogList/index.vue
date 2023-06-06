<template>
  <div class="bloglist-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * limit + 1 }}</template>
      </el-table-column>
      <el-table-column label="文章名称" width="250" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="标题"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              :preview-src-list="thumblist"
              fit="contain"
            />
            <span
              slot="reference"
              style="cursor: pointer"
              @click="goblogTitle(scope.row)"
            >
              {{ scope.row.title }}
            </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="文章描述" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="浏览数" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>
      <el-table-column label="评论量" align="center" width="100">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>
      <el-table-column label="所属分类" align="center" width="150">
        <template slot-scope="scope">{{ scope.row.category.name || '未分类' }}</template>
      </el-table-column>
      <el-table-column label="创建日期" align="center" width="200">
        <template slot-scope="scope">{{
          formatDate(scope.row.createDate)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editBlogHandle(scope.row)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteOneblog(scope.row)" />
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
import { getBlogs, delOneblog } from '@/api/blog'
import { formatDate } from '@/utils/tools'
import { frontend_url } from '@/baseurl.config'
export default {
  data() {
    return {
      data: [],
      thumblist: [],
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
    async fetchData() {
      await getBlogs(this.currentPage, this.limit).then(({ data }) => {
        this.data = data.rows
        this.total = data.total
        for (const item of this.data) {
          this.thumblist.push(item.thumb)
        }
        const countPages = Math.ceil(this.total / this.limit) // 总页数
        if (countPages < this.currentPage) {
          this.currentPage = countPages
          this.fetchData()
        }
      })
    },
    // 跳转到前端文章详情
    goblogTitle(blogInfo) {
      window.open(`${frontend_url}/article/${blogInfo.id}`, '_blank')
    },
    // 删除文章
    deleteOneblog(blogInfo) {
      this.$confirm('删除该文章会将下面的评论一并删除，是否继续？', '删除该文章', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          delOneblog(blogInfo.id).then(() => {
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
    // 跳转到编辑页面
    editBlogHandle(info) {
      this.$router.push(`/editBlog/${info.id}`)
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
.bloglist-container {
  margin: 20px;
  .pager {
    margin-top: 20px;
  }
}
</style>
