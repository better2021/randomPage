<template>
  <div>
    <div id="SomeElementYouWantToAnimate"></div>
  </div>
</template>

<script>
import loadFile from '@/libs/test.js'
import { stat } from 'fs'
export default {
  data() {
    return {
    }
  },
  mounted() {
    var start = null
    var element = document.getElementById('SomeElementYouWantToAnimate')
    element.style.position = 'absolute'

    function step(timestamp) {
      if (!start) start = timestamp
      var progress = timestamp - start
      element.style.left = Math.min(progress / 10, 500) + 'px'
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
  render(h) {
    return (<p></p>)
  }
}
</script>

<style lang="less" scoped>
#SomeElementYouWantToAnimate{
  width: 100px;
  height: 100px;
  background: pink;
}
</style>
