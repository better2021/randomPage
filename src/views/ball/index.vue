<template>
  <div id="ball" :style="{backgroundImage:`url(${imgUrl})`}">
    <span class="btn" :class="{active:isActive}" @click="changePic"></span>
  </div>
</template>

<script>
import Circle from '@/libs/circle'
import { randNum } from '@/libs/index'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      isActive: false,
      list: ['https://cdn.pixabay.com/photo/2018/04/06/00/25/nature-3294681_960_720.jpg',
        'https://cdn.pixabay.com/photo/2015/06/19/20/13/sunset-815270_960_720.jpg',
        'https://cdn.pixabay.com/photo/2014/12/16/22/25/youth-570881_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
        'https://cdn.pixabay.com/photo/2014/08/26/15/17/tuscany-428041_1280.jpg',
        'https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736875_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/09/05/21/37/cat-1647775_1280.jpg',
        'https://cdn.pixabay.com/photo/2019/04/20/08/42/genoa-4141143_1280.jpg'],
      imgUrl: ''
    }
  },
  mounted() {
    document.title = '躁动的小球'
    console.log(Circle)
    this.imgUrl = this.list[randNum(1, 8) - 1]
    for (var i = 0; i < 50; i++) {
      // 这些函数里面涉及原型，通过 Circle()函数可以找到指向draw,run函数。
      var c = new Circle()
      c.drawCirle(document.getElementById('ball'))
      c.run()
    }
  },
  methods: {
    changePic() {
      console.log(randNum(1, 8))
      const num = randNum(1, 8) - 1
      this.isActive = true
      this.imgUrl = this.list[num]
      setTimeout(() => {
        this.isActive = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
#ball{
    width: 100vw;
    height: 700px;
    background-size: cover;
    position: relative;
    background-attachment: fixed;
    background-repeat: no-repeat;
    /deep/div{
      border-radius: 50%;
      position: absolute;
  }
  .btn{
    display: inline-block;
    position: fixed;
    right: 20px;
    bottom: 30px;
    z-index: 99;
    width: 50px;
    height: 50px;
    background: url('https://i.loli.net/2019/04/27/5cc43bec7c088.png') no-repeat;
    background-size:cover;
    transition: all 0.6s ease-in-out;
    &:hover{
      transform: scale(1.2);
    }
  }
  .active{
      transform: rotate(540deg);
    }
}
</style>
