<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <div>
      <el-input v-model="form.title" placeholder="请输入文章标题" />
    </div>
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      height="600px"
      :options="editorOptions"
    />
    <div class="block">文章描述</div>
    <div>
      <el-input v-model="form.description" type="textarea" :rows="6" />
    </div>
    <div class="block">文章头图</div>
    <Upload
      v-model="form.thumb"
    />
    <div class="block">选择分类</div>
    <div>
      <el-select v-model="form.select" placeholder="请选择" @change="changeHandle">
        <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div class="block">
      <el-button type="primary" @click="handleClick">{{ buttonText }}</el-button>
    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import Upload from '@/components/Upload'
import { getBlogTypes } from '@/api/blogType'
import { addblog, findOndblog, editblog } from '@/api/blog'
import '@toast-ui/editor/dist/i18n/zh-cn'
export default {
  components: {
    Editor,
    Upload
  },
  props: {
    mode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: null,
      form: {
        title: '',
        description: '',
        thumb: '',
        select: ''
      },
      selectList: [],
      buttonText: '发布文章',
      editorOptions: {
        language: 'zh-CN'
      }
    }
  },
  created() {
    getBlogTypes().then(res => {
      this.selectList = res.data
    })
    if (this.mode === 'edit') {
      this.id = this.$route.params.id
      findOndblog(this.id).then(res => {
        this.form = res.data
        this.form.select = res.data.category.id || ''
        this.$refs.toastuiEditor.invoke('setHTML', res.data.htmlContent)
      })
      this.buttonText = '确认修改'
    }
  },
  methods: {
    handleClick() {
      const html = this.$refs.toastuiEditor.invoke('getHTML')
      const markdown = this.$refs.toastuiEditor.invoke('getMarkdown')
      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: Date.now(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown
      }
      if (obj.title && obj.description && obj.categoryId && obj.htmlContent) {
        if (this.mode === 'edit') {
          editblog({ id: this.id, data: obj }).then(() => {
            this.$message.success('文章修改成功')
            this.$router.push('/blogList')
          })
        } else {
          addblog(obj).then(() => {
            this.$message.success('文章发布成功')
            this.$router.push('/blogList')
          })
        }
      } else {
        this.$message.error('请填写所有内容')
      }
    },
    changeHandle() {
      this.$forceUpdate()
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
