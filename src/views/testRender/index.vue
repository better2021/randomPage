<template>
  <div>
    <div id="SomeElementYouWantToAnimate"></div>
    <button @click="showTime">mixin测试</button>
    <button @click="handleTime">mixin1</button>
    <keep-alive>
      <selectCity></selectCity>
    </keep-alive>
    <p>{{ stringTest }}</p>

    <el-button type="primary" @click="handleCreate">
      注册用户
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>

    <div v-loading="loading" style="width:1000px;margin:0 auto">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" min-width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180"></el-table-column>
        <el-table-column prop="avatar" label="头像" min-width="100">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:50px;border-radius:100%" alt />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.date.substring(0,10) }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="用户注册" :visible.sync="dialogVisible" width="600px">
      <el-form ref="ruleForm" :model="fromData" :rules="rules" label-width="80px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="fromData.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="fromData.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="您的密码" prop="password">
          <el-input v-model="fromData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="fromData.password2" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sha256 from 'crypto-js/sha256'
var CryptoJS = require('crypto-js')

const str = 'adc123qq'
console.log(sha256(str), '666***')

// encrypt base64加密
var rawStr = 'hello world!'
var wordArray = CryptoJS.enc.Utf8.parse(rawStr)
var base64 = CryptoJS.enc.Base64.stringify(wordArray)
console.log('encrypted:', base64)

//  decrypt base64解密
var parsedWordArray = CryptoJS.enc.Base64.parse(base64)
var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8)
console.log('parsed:', parsedStr)

import selectCity from '@/components/selectCity'
import loadFile from '@/libs/test.js'
import { mymixin, mixin1 } from './mixinTest.js'

const initFromData = {
  name: '',
  email: '',
  password: '',
  password2: ''
}
export default {
  components: { selectCity },
  mixins: [mymixin, mixin1],
  data() {
    return {
      txt: '这是vue的render函数渲染出来的',
      stringTest: 'hello node js es6',
      tableData: [],
      dialogVisible: false,
      fromData: { ...initFromData },
      loading: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            trigger: 'blur',
            message: '请输入正确的邮箱地址'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password2: [
          { required: true, message: '输入的密码不一致', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    console.log(this.txt, '-----')
    console.log(this.test, '+++++')

    var wordArray = CryptoJS.enc.Utf8.parse(this.stringTest)
    this.stringTest = CryptoJS.enc.Base64.stringify(wordArray)

    var start = null
    var element = document.getElementById('SomeElementYouWantToAnimate')
    element.style.position = 'absolute'

    function step(timestamp) {
      if (!start) start = timestamp
      var progress = timestamp - start
      element.style.left = Math.min(progress / 10, 300) + 'px'
      if (progress < 20000) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)

    const listUrl = [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.0/fullcalendar.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.0/locale/zh-cn.js'
    ]
    loadFile(listUrl)
    this.getData()
  },
  methods: {
    // 获取数据列表
    async getData() {
      this.loading = true
      const res = await this.axios({
        url: 'http://localhost:5000/api/users/list',
        method: 'GET'
      })
      this.loading = false
      if (res.status === 200) {
        this.tableData = res.data
      }
      console.log(res, '---')
    },
    handleCreate() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 确认
    handleSure() {
      this.$refs['ruleForm'].validate(async valid => {
        if (!valid) return
        const res = await this.axios({
          url: 'http://localhost:5000/api/users/register',
          method: 'POST',
          data: this.fromData
        })
        if (res.status === 200) {
          this.tableData = res.data
        }
        console.log(res)
        this.dialogVisible = false
        this.getData()
      })
    },
    handleTime() {
      console.log(this.time)
    }
  }
}
</script>

<style lang="less" scoped>
#SomeElementYouWantToAnimate {
  width: 100px;
  height: 100px;
  background: pink;
}
</style>
