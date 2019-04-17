<template>
  <!-- swiper -->
  <div class="swiperBox">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in 8" :key="item" :style="`background:${color()}`">Slide{{ item }}</swiper-slide>
      <div slot="pagination" class="swiper-pagination"></div>
      <div slot="button-prev" class="swiper-button-prev"></div>
      <div slot="button-next" class="swiper-button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    // 获取随机色
    color() {
      return '#' + ((Math.random() * 0xffffff) << 0).toString(16) // 随机颜色
    }
  }
}
</script>
<style lang="less" scoped>
.swiperBox {
  width: 1000px;
  height: 500px;
  margin: 10px auto;
  .swiper-container {
    height: 500px;
    border-radius: 5px;
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
