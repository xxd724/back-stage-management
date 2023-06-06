<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input v-model="url" :disabled="isDisabled" />
    <el-button type="primary" class="block" @click="handleClick">{{ buttonText }}</el-button>
  </div>
</template>

<script>
import { getAbout, setAbout } from '@/api/about'
export default {
  data() {
    return {
      url: '',
      isDisabled: true,
      buttonText: '编辑'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.url = data
      })
    },
    handleClick() {
      if (this.buttonText === '编辑') {
        this.buttonText = '完成'
        this.isDisabled = !this.isDisabled
      } else {
        if (this.url) {
          this.buttonText = '编辑'
          setAbout({ url: this.url }).then(() => {
            this.fetchData()
            this.isDisabled = !this.isDisabled
            this.$message.success('编辑成功')
          })
        } else {
          this.$message.warning('输入框不能为空')
        }
      }
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
