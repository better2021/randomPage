<template>
  <div>
    <button @click="notifyMe">桌面通知</button>
    <button class="button" style="margin:0 10px;">Hello</button>
    <input type="file" accept="image/*" class="file">
    <button id="btn" onclick="javascript:alert('hello world')">按</button>
    <span style="color:#f00;font-size:30px">{{ startVal }}</span>
    <div>
      <el-input v-model="txt" placeholder="输入github的昵称就可以搜到最近提交哦" clearable style="width:300px;margin-right:5px;"></el-input>
      <el-button type="primary" round @click="handleSearch">搜索</el-button>
    </div>
    <div><img :src="githubUrl" /></div>
    <div>
      <qrcode value="https://feiyuweb.github.io/vueApp/" :options="{ width: 200,color: { dark: '#5f9da3' } }" tag="img"></qrcode>
    </div>
    <div id="aplayer"></div>
    <div>
      <SubmitButton :list="dataList"/>
      <SubmitButton>
        <template v-slot:haha>
          <h3 style="color:#f00">asdsff</h3>
          <p>v-slot</p>
          <p>使用v-slot将父组件的html传递给子组件，就像使用props给子组件传参类似</p>
        </template>
      </SubmitButton>
      <SubmitButton>
        <template v-slot:yaya>
          <el-button
            plain
            @click="open"
          >
            可自动关闭
          </el-button>
          <el-button
            plain
            @click="open2"
          >
            不会自动关闭
          </el-button>
        </template>
      </SubmitButton>
    </div>
  </div>
</template>

<script>
import { star, getExplorer } from '@/libs/index'
import qrcode from '@chenfengyuan/vue-qrcode'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import { songList } from './songList.js'

import SubmitButton from '@/components/SubmitButton'

export default {
  components: { qrcode, SubmitButton },
  data() {
    return {
      txt: 'feiyuWeb',
      githubUrl: 'https://ghchart.rshah.org/feiyuWeb',
      startVal: '',
      dataList: ['one', 'two', 'three']
    }
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
      } else if (Notification.permission === 'granted') { // 检查用户是否同意接受通知
        // If it's okay let's create a notification
        new Notification('Hi there!', {
          body: '这是一条桌面通知哦', // 消息主体
          icon: 'https://i.loli.net/2019/04/13/5cb14d9ac9d9d.jpeg' // 通知时显示的图标
        })
      } else if (Notification.permission !== 'denied') { // 否则我们需要向用户获取权限
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
