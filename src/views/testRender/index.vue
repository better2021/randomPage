<template>
  <div>
    <div id="SomeElementYouWantToAnimate"></div>
    <button @click="showTime">mixin测试</button>
    <button @click="handleTime">mixin1</button>
    <keep-alive>
      <selectCity></selectCity>
    </keep-alive>
    <p>{{ stringTest }}</p>
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
export default {
  components: { selectCity },
  mixins: [mymixin, mixin1],
  data() {
    return {
      txt: '这是vue的render函数渲染出来的',
      stringTest: 'hello node js es6'
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
  },
  methods: {
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
