<template>
  <div>
    <button @click="notifyMe">桌面通知</button>
    <button class="button" style="margin:0 10px;">Hello</button>
    <input type="file" accept="image/*" class="file" />
    <button id="btn" onclick="javascript:alert('hello world')">按</button>
    <span style="color:#f00;font-size:30px">{{ startVal }}</span>
    <div>
      <el-input
        v-model="txt"
        placeholder="输入github的昵称就可以搜到最近提交哦"
        clearable
        style="width:300px;margin-right:5px;"
      ></el-input>
      <el-button type="primary" round @click="handleSearch">搜索</el-button>
    </div>
    <div>
      <img :src="githubUrl" />
    </div>
    <div>
      <qrcode
        value="https://feiyuweb.github.io/vueApp/"
        :options="{ width: 200,color: { dark: '#5f9da3' } }"
        tag="img"
      ></qrcode>
    </div>
    <div id="aplayer"></div>
    <div>
      <SubmitButton :list="dataList" />
      <SubmitButton>
        <template v-slot:haha>
          <h3 style="color:#f00">asdsff</h3>
          <p>v-slot</p>
          <p>使用v-slot将父组件的html传递给子组件，就像使用props给子组件传参类似</p>
        </template>
      </SubmitButton>
      <SubmitButton>
        <template v-slot:yaya>
          <el-button plain @click="open">可自动关闭</el-button>
          <el-button plain @click="open2">不会自动关闭</el-button>
        </template>
      </SubmitButton>

      <div v-loading="loading" style="width:1200px;margin:0 auto">
        <el-button type="primary" @click="handleCreate">
          新增用户
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="userName" label="用户名" min-width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="180"></el-table-column>
          <el-table-column prop="tel" label="手机号" min-width="180"></el-table-column>
          <el-table-column prop="address" label="地址" min-width="180"></el-table-column>
          <el-table-column prop="createTime" label="日期" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime&&scope.row.createTime.substring(0,10) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getData()"
        />
      </div>
      <!-- 弹窗 -->
      <div>
        <el-dialog
          :title="type==='create'?'新增用户':'编辑用户'"
          :visible.sync="dialogVisible"
          width="500px"
        >
          <el-form ref="ruleForm" :model="fromData" :rules="rules" label-width="80px">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="fromData.userName" placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="fromData.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model="fromData.tel" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="fromData.address" placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSure">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { star, getExplorer } from '@/libs/index'
import qrcode from '@chenfengyuan/vue-qrcode'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import { songList } from './songList.js'

import Pagination from '@/components/Pagination'
import SubmitButton from '@/components/SubmitButton'

const initFromData = {
  userName: '',
  tel: '',
  address: '',
  email: ''
}
export default {
  components: { Pagination, qrcode, SubmitButton },
  data() {
    return {
      txt: 'feiyuWeb',
      githubUrl: 'https://ghchart.rshah.org/feiyuWeb',
      startVal: '',
      dataList: ['one', 'two', 'three'],
      loading: false,
      type: 'create',
      dialogVisible: false,
      tableData: [],
      fromData: { ...initFromData },
      total: 0,
      query: {
        pageNum: 1,
        pageSize: 10
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            trigger: 'change',
            message: '请输入正确的邮箱地址'
          }
        ],
        tel: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号应为11个字符', trigger: 'change' }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    const options = {
      container: document.getElementById('aplayer'),
      autoplay: false,
      listFolded: false,
      istMaxHeight: 90,
      order: 'random',
      lrcType: 1, // type为1时表示歌词直接写入lrc对象,为3时是已lrc文件的方式引入
      audio: songList
    }
    const ap = new APlayer(options)
    ap.on('ended', function() {
      console.log('player ended')
    })

    console.log(getExplorer())
    this.startVal = star(3)

    var button = document.querySelector('.button')
    const file = document.querySelector('.file')
    const btn = document.getElementById('btn')
    let a = 1
    button.onclick = function() {
      a++
      console.log(a)
      btn.onclick() // 模拟点击btn
      if (a === 5) {
        downloadImg(
          'https://avatars2.githubusercontent.com/u/18045294?s=460&v=4'
        )
        button.onclick = null
      }
    }

    file.onchange = function() {
      // 第一种方法 createObjectURL
      const obj = this.files[0] // 获取input上传的图片数据;

      // 第二种方法
      const read = new FileReader() // 创建FileReader对像;
      read.readAsDataURL(obj) // 调用readAsDataURL方法读取文件
      read.onload = function() {
        const img = new Image()
        img.src = read.result // 拿到读取结果
        img.width = 100
        img.height = 100
        document.body.appendChild(img)
        console.log(img)
      }
      console.log(read)
    }

    // 查找url？后面的字符串
    // function searchName(key) {
    //   if (!window.location.search) return console.log('url后面没有参数哦')
    //   let arr = window.location.search.slice(1).split('&')
    //   let obj = {}
    //   for (let i of arr) {
    //     // console.log(i)
    //     let newArr = i.split('=')
    //     let key = newArr[0]
    //     let value = newArr[1]
    //     obj[key] = value
    //   }
    //   // console.log(obj)
    //   return obj[key]
    // }

    // 图片下载
    function downloadImg(url) {
      fetch(url).then(res =>
        res.blob().then(blob => {
          const a = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = '哈哈'
          a.click()
          window.URL.revokeObjectURL(url)
        })
      )
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.githubUrl = `https://ghchart.rshah.org/${this.txt}`
    },

    // 桌面通知
    notifyMe() {
      // 先检查浏览器是否支持
      if (!window.Notification) {
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') {
        // 检查用户是否同意接受通知
        // If it's okay let's create a notification
        new Notification('Hi there!', {
          body: '这是一条桌面通知哦', // 消息主体
          icon: 'https://i.loli.net/2019/04/13/5cb14d9ac9d9d.jpeg' // 通知时显示的图标
        })
      } else if (Notification.permission !== 'denied') {
        // 否则我们需要向用户获取权限
        Notification.requestPermission(function(permission) {
          // 如果用户同意，就可以向他们发送通知
          if (permission === 'granted') {
            new Notification('Hi there!')
          }
        })
      }

      // 最后，如果执行到这里，说明用户已经拒绝对相关通知进行授权
      // 出于尊重，我们不应该再打扰他们了
    },
    open() {
      const h = this.$createElement

      this.$notify({
        title: '标题名称',
        message: h(
          'i',
          { style: 'color: teal' },
          '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
        )
      })
    },

    open2() {
      this.$notify({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      })
    },
    // 新增
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
      this.fromData = { ...row, id: row.id }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 获取列表数据
    async getData() {
      this.loading = true
      const res = await this.axios({
        url: 'http://localhost:3000/sqlApi/user/list',
        method: 'GET',
        params: this.query
      })
      this.loading = false
      if (res.status !== 200) {
        return this.$message.error(res.data.msg || '删除失败')
      }
      console.log(res)
      this.tableData = res.data.list
      this.total = res.data.attributes.total
    },
    // 确认
    handleSure() {
      this.$refs['ruleForm'].validate(async valid => {
        if (!valid) return
        let res
        if (this.type === 'create') {
          res = await this.axios({
            url: 'http://localhost:3000/sqlApi/user/create',
            method: 'POST',
            data: this.fromData
          })
        } else {
          res = await this.axios({
            url: 'http://localhost:3000/sqlApi/user/update',
            method: 'PUT',
            data: this.fromData
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
    // 删除
    async handleDelete(index, row) {
      console.log(index, row)
      const res = await this.axios({
        url: 'http://localhost:3000/sqlApi/user/delete',
        method: 'DELETE',
        data: { id: row.id }
      })
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error(res.data.msg || '删除失败')
      }
      this.$message.success('删除成功')
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
#aplayer {
  width: 300px;
  margin: 0 auto;
}
</style>
