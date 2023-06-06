<template>
  <div class="app-container">
    <div class="block">网站信息</div>
    <p>网站标题</p>
    <el-input v-model="form.siteTitle" class="input" disabled />
    <p>邮箱</p>
    <el-input v-model="form.mail" class="input" disabled />
    <p>备案号</p>
    <el-input v-model="form.icp" class="input" disabled />
    <el-divider />
    <div class="block">网站头像信息</div>
    <el-image
      style="width: 100px; height: 100px;"
      :src="form.avatar"
      fit="contain"
    />
    <el-divider />
    <div class="block">网址图标信息</div>
    <p>网址图标地址</p>
    <el-input v-model="form.favicon" class="input" placeholder="请输入图标地址" disabled />
    <p>网址图标预览</p>
    <el-image
      style="width: 50px; height: 50px;"
      :src="form.favicon"
      fit="contain"
    />
    <el-divider />
    <div class="block">github 信息</div>
    <p>github 名字</p>
    <el-input v-model="form.githubName" class="input" disabled />
    <p>github 地址</p>
    <el-input v-model="form.github" class="input" disabled />
    <el-divider />
    <div class="block">QQ 信息</div>
    <p>QQ 号码</p>
    <el-input v-model="form.qq" class="input" disabled />
    <p>QQ 二维码图片预览</p>
    <el-image
      style="width: 100px; height: 100px"
      :src="form.qqQrCode"
    />
    <el-divider />
    <div class="block">微信信息</div>
    <p>微信号</p>
    <el-input v-model="form.weixin" class="input" disabled />
    <p>微信二维码图片预览</p>
    <el-image
      style="width: 100px; height: 100px"
      :src="form.weixinQrCode"
    />
    <el-divider />
    <el-button type="primary" @click="openEditPanel">进入编辑模式</el-button>

    <!-- 编辑模式 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogVisible"
      width="50%"
      top="5vh"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="网站标题">
          <el-input v-model="form2.siteTitle" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form2.mail" />
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form2.icp" />
        </el-form-item>
        <el-form-item label="网站头像地址">
          <Upload v-model="form2.avatar" />
        </el-form-item>
        <el-form-item label="网站图标地址">
          <el-input v-model="form2.favicon" />
        </el-form-item>
        <el-form-item label="github 名字">
          <el-input v-model="form2.githubName" />
        </el-form-item>
        <el-form-item label="github 地址">
          <el-input v-model="form2.github" />
        </el-form-item>
        <el-form-item label="QQ 号码">
          <el-input v-model="form2.qq" />
        </el-form-item>
        <el-form-item label="QQ 二维码图片地址">
          <Upload v-model="form2.qqQrCode" />
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form2.weixin" />
        </el-form-item>
        <el-form-item label="微信二维码图片地址">
          <Upload v-model="form2.weixinQrCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSetting, setSetting } from '@/api/setting'
import Upload from '@/components/Upload'
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        siteTitle: '',
        mail: '',
        icp: '',
        avatar: '',
        favicon: '',
        githubName: '',
        github: '',
        qq: '',
        qqQrCode: '',
        weixin: '',
        weixinQrCode: ''
      },
      dialogVisible: false,
      form2: {
        siteTitle: '',
        mail: '',
        icp: '',
        avatar: '',
        favicon: '',
        githubName: '',
        github: '',
        qq: '',
        qqQrCode: '',
        weixin: '',
        weixinQrCode: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSetting().then(res => {
        console.log(res)
        this.form = res.data
        this.form2 = { ...this.form }
      })
    },
    openEditPanel() {
      this.dialogVisible = true
    },
    confirmHandle() {
      setSetting(this.form2).then(() => {
        this.dialogVisible = false
        this.fetchData()
        this.$message.success('修改成功！')
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
p{
    font-size: 14px;
}
.input{
    width: 600px;
}
</style>
