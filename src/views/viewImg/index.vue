<template>
  <div>
    <button class="button">Hello</button>
    <input type="file" accept="image/*" class="file">
    <button onclick="javascript:alert('hello world')" id="btn">按</button>
    <span style="color:#f00;font-size:30px">{{startVal}}</span>
    <div>
      <el-input placeholder="输入github的昵称就可以搜到最近提交哦" v-model="txt" clearable style="width:300px;margin-right:5px;"></el-input>
      <el-button type="primary" round @click="handleSearch">搜索</el-button>
    </div>
    <div><img :src="githubUrl" /></div>
    <div>
      <qrcode value="https://feiyuweb.github.io/vueApp/" :options="{ width: 200,color: { dark: '#5f9da3' } }" tag="img"></qrcode>
    </div>
    <div id="aplayer"></div>
  </div>
</template>

<script>
import { star, getExplorer } from '@/libs/index'
import qrcode from '@chenfengyuan/vue-qrcode'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import { songList } from './songList.js'

export default {
  components: { qrcode },
  data() {
    return {
      txt: 'feiyuWeb',
      githubUrl: 'https://ghchart.rshah.org/feiyuWeb',
      startVal: ''
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
    let file = document.querySelector('.file')
    let btn = document.getElementById('btn')
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
      let obj = this.files[0] // 获取input上传的图片数据;

      // 第二种方法
      let read = new FileReader() // 创建FileReader对像;
      read.readAsDataURL(obj) // 调用readAsDataURL方法读取文件
      read.onload = function() {
        let img = new Image()
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
