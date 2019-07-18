<template>
  <div>
    <div id="SomeElementYouWantToAnimate"></div>
    <button @click="showTime">mixin测试</button>
    <button @click="handleTime">mixin1</button>
    <keep-alive>
      <selectCity></selectCity>
    </keep-alive>
    <el-upload class="upload-demo" drag action="http://localhost:5000/api/uploadFile/upload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
    </el-upload>
    <p>{{ stringTest }}</p>
    <div style="width:500px;margin:20px auto">
      <el-input v-model="keyWord" placeholder="请输入您要搜索的关键字" style="width:300px;margin-right:10px"></el-input>
      <el-button type="primary" @click="handleSearch">
        搜索
        <i class="el-icon-search el-icon--left"></i>
      </el-button>
    </div>

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
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="type==='create'?'用户注册':'编辑信息'" :visible.sync="dialogVisible" width="500px">
      <el-form ref="ruleForm" :model="fromData" :rules="rules" label-width="80px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="fromData.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="fromData.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <template v-if="type==='create'">
          <el-form-item label="您的密码" prop="password">
            <el-input v-model="fromData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="fromData.password2" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
        </template>
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
      type: '',
      keyWord: '',
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
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码的长度不能小于6位，且不能超过20位',
            trigger: 'blur'
          }
        ],
        password2: [
          { required: true, message: '输入的密码不一致', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '密码的长度不能小于6位，且不能超过20位',
            trigger: 'blur'
          }
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
        method: 'GET',
        params: { name: this.keyWord }
      })
      this.loading = false
      console.log(res, '---')
      if (res.status !== 200) {
        return this.$message.error(res.data.msg || '删除失败')
      }
      this.tableData = res.data
    },
    //  搜索
    handleSearch() {
      this.getData()
    },
    // 注册
    handleCreate() {
      this.dialogVisible = true
      this.type = 'create'
      this.fromData = { ...initFromData }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row)
      this.dialogVisible = true
      this.type = 'edit'
      this.fromData = { ...row, id: row._id }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const res = await this.axios({
            url: 'http://localhost:5000/api/users/delete',
            method: 'delete',
            data: {
              id: row._id
            }
          })
          if (res.status !== 200) {
            return this.$message.error(res.data.msg || '删除失败')
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        })
        .catch(() => {
          console.log('取消删除')
        })
    },
    // 确认
    handleSure() {
      this.$refs['ruleForm'].validate(async valid => {
        if (!valid) return
        let res
        if (this.type === 'create') {
          res = await this.axios({
            url: 'http://localhost:5000/api/users/register',
            method: 'POST',
            data: this.fromData
          })
        } else {
          res = await this.axios({
            url: 'http://localhost:5000/api/users/update',
            method: 'PUT',
            data: {
              name: this.fromData.name,
              email: this.fromData.email,
              id: this.fromData.id
            }
          })
        }

        if (res.status !== 200) {
          this.$message = {
            type: 'error',
            message: res.data.msg
          }
          return false
        }
        this.dialogVisible = false
        this.getData()

        this.$message({
          type: 'success',
          message: this.type === 'create' ? '创建成功' : '更新成功'
        })
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
