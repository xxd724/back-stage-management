<template>
  <div class="app-container">
    <!-- 添加按钮 -->
    <div v-if="data.length === 0" class="addbtn">
      <el-button type="primary" @click="addhandle">添加</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="data" :border="true" style="width: 100%">
      <el-table-column label="序号" width="100" align="center">
        <template slot-scope="scope">
          <div>{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="250" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.title }}</div>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <div>{{ scope.row.description }}</div>
        </template>
      </el-table-column>
      <el-table-column label="中图预览" align="center" width="200">
        <template slot-scope="scope">
          <div>
            <el-image
              style="width: 100px"
              :src="scope.row.midImg"
              fit="fill"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center" width="200">
        <template slot-scope="scope">
          <div>
            <el-image
              style="width: 100px;"
              :src="scope.row.bigImg"
              fit="fill"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <div>
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :hide-after="2000"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                @click="editHandle(scope.row)"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" top="10vh">
      <el-form :model="forms">
        <el-form-item label="标题">
          <el-input v-model="forms.title" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="forms.description"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="查看中图">
              <Upload
                v-model="forms.midImg"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="查看大图">
              <Upload
                v-model="forms.bigImg"
              />
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, updateBanner } from '@/api/banner'
import Upload from '@/components/Upload/index'
export default {
  components: {
    Upload
  },
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      forms: {
        id: '',
        title: '',
        description: '',
        midImg: '',
        bigImg: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      await getBanner().then((res) => {
        this.data = res.data
        console.log(this.data)
      })
    },
    addhandle() {
      this.dialogFormVisible = true
    },
    editHandle(handleInfo) {
      this.forms = { ...handleInfo }
      this.dialogFormVisible = true
    },
    handleConfirm() {
      const length = this.data.length
      if (length > 0) {
        const arr = [...this.data]
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === this.forms.id) {
            arr[i] = this.forms
          }
        }
        updateBanner(arr).then(res => {
          if (res.code === 0) {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '编辑成功！'
            })
          }
        })
      } else {
        const arr = []
        for (let i = 0; i < 3; i++) {
          arr.push(this.forms)
        }
        updateBanner(arr).then(res => {
          if (res.code === 0) {
            this.fetchData()
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addbtn{
  margin-bottom: 20px;
}
</style>
