<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <div>
      <a href="javascript:;" @click="downImage">下载</a>
    </div>
    <Brothers></Brothers>
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App" @getVal="getObj" />
  </div>
</template>

<script>
import FileSaver from 'file-saver'
console.log(FileSaver)
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Brothers from '@/components/Brothers.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Brothers
  },
  mounted() {
    this.$refs.hello.conMsg() // 父组件调用子组件的方法
  },
  methods: {
    // 下载
    downImage() {
      var blob = new Blob(['Hello, world!'], {
        type: 'text/plain;charset=utf-8'
      })
      FileSaver.saveAs(blob, 'hello world.txt')
    },
    // downImage(imgsrc) {
    //   // 下载图片地址和图片名
    //   const image = new Image()
    //   // 解决跨域 Canvas 污染问题
    //   image.setAttribute('crossOrigin', 'anonymous')
    //   image.onload = function() {
    //     const canvas = document.createElement('canvas')
    //     canvas.width = image.width
    //     canvas.height = image.height
    //     const context = canvas.getContext('2d')
    //     context.drawImage(image, 0, 0, image.width, image.height)
    //     const url = canvas.toDataURL('image/jpg') // 得到图片的base64编码数据
    //     console.log(url, 'url')
    //     canvas.toBlob(function(blob) {
    //       FileSaver.saveAs(blob, 'pretty image.png')
    //     })
    //     // const a = document.createElement('a') // 生成一个a元素
    //     // const event = new MouseEvent('click') // 创建一个单击事件
    //     // a.download = name || 'code.jpg' // 设置图片名称
    //     // a.href = url // 将生成的URL设置为a.href属性
    //     // a.dispatchEvent(event) // 触发a的单击事件
    //   }
    //   image.src = imgsrc
    // },
    // 父组件接受子组件传来的值
    getObj(val) {
      console.log(val)
    }
  }
}
</script>
