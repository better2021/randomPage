<template>
  <div id="music" :style="{background:colors.hex}">
    <div class="numBox">
      <ul>
        <li id="one" :style="{color:colorOne.hex}"></li>
        <li id="two" :style="{color:colorTwo.hex}"></li>
      </ul>
    </div>
    <div style="display: flex;justify-content: space-around">
      <photoshop-picker v-model="colors" @input="updateValue"/>
      <chrome-picker v-model="colorOne"/>
      <sketch-picker v-model="colorTwo"/>
    </div>
    <SwiperDome></SwiperDome>
  </div>
</template>
<script>
import CountUp from 'countup'
import SwiperDome from '@/components/swiperDome'
import { Photoshop, Chrome, Sketch } from 'vue-color'

export default {
  components: {
    'photoshop-picker': Photoshop,
    'chrome-picker': Chrome,
    'sketch-picker': Sketch,
    SwiperDome
  },
  data() {
    return {
      musicList: [],
      colors: {
        hex: '#3FB87C'
      },
      colorOne: {
        hex: '#f00f00'
      },
      colorTwo: {
        hex: '#F5A623'
      }
    }
  },
  created() {
    this.getMusic()
  },
  mounted() {
    // 参数说明：‘one’=>绑定的id名；0=>起始值；12345=>结束值;0=>小数位数；3=>延时秒数
    const numAnim = new CountUp('one', 0, 12345, 0, 3)
    const numdemo = new CountUp('two', 0, 3650.25, 2)
    numAnim.start()
    numdemo.start()
  },
  methods: {
    // 获取音乐排行榜
    getMusic() {
      this.axios({
        method: 'GET',
        url: 'https://api.apiopen.top/musicRankings',
        data: {}
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.result)
          } else {
            console.log(res.data.message)
          }
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          console.log('接口请求完成时执行，成功或失败都回执行!')
        })
    },
    // 选择的颜色
    updateValue() {
      console.log(this.colors)
    }
  }
}
</script>
<style lang="less" scoped>
.numBox {
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      width: 300px;
      height: 200px;
      line-height: 200px;
      text-align: center;
      border: 1px #f1f1f1 solid;
      margin: 10px;
      box-shadow: 3px 3px 5px #dddddd;
      font-weight: 600;
      font-size: 50px;
      background: #ffffff;
      transition: all 0.5s ease-out;
    }
    li:nth-of-type(1) {
      transform: skew(10deg);
    }
    li:nth-of-type(2) {
      transform: skew(-10deg);
    }
    li:hover {
      transform: skewX(0);
    }
  }
}
</style>
