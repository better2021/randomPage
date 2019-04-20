<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="wrapper"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <h2>
      {{ dataSource.title }}
      （总共
      <span id="totalNum"></span>部）
    </h2>
    <el-rate v-model="value3" show-text></el-rate>
    <div>
      <canvas id="canvas" style="width:500px;">当前浏览器不支持canvas，请更换浏览器后再试</canvas>
    </div>
    <ul>
      <li v-for="(item,index) in dataSource.subjects" :key="index">
        <p class="tags">
          <span v-for="todo in item.genres" :key="todo" :style="`background:${color()}`">{{ todo }}</span>
        </p>
        <a :href="item.alt" target="_blank">
          <img v-lazy="item.images.large">
        </a>
        <p>{{ item.title }}</p>
      </li>
    </ul>
    <div v-show="isShow" class="backTop" @click="backToTop"></div>
  </div>
</template>

<script>
import CountUp from 'countup'
import { clock } from '@/libs/clock.js'
import { scrollTo } from '@/libs/scrollTo.js'

export default {
  data() {
    return {
      loading: false,
      dataSource: {},
      value3: 4,
      isShow: false
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    clock() // 执行时钟效果
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 豆瓣正在热映电影
    getData() {
      this.loading = true
      this.jsonp(
        'https://api.douban.com/v2/movie/in_theaters?start=0&count=30',
        { method: 'GET' },
        (err, data) => {
          this.loading = false
          if (err) {
            console.log(err)
            throw new Error(err)
          } else {
            // console.log(data);
            const numAnim = new CountUp('totalNum', 0, data.total)
            numAnim.start()
            this.dataSource = data
          }
        }
      )
    },
    color() {
      return '#' + ((Math.random() * 0xffffff) << 0).toString(16) // 随机颜色
    },
    handleScroll() {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(top)
      this.isShow = top > 300
    },
    // 返回顶部
    backToTop() {
      scrollTo(0, 800, function() {
        console.log('800毫秒返回顶部')
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
