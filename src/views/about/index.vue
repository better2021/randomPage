<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="about"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <h1>MV与豆瓣TOP30</h1>
    <div class="mvBox">
      <ul>
        <li v-for="(item,index) in mvList" :key="index">
          <img :src="item.cover" />
        </li>
      </ul>
    </div>

    <div class="topFilm">
      <h3>{{ title }}</h3>
      <ul>
        <li
          v-for="(todo,index) in dataSource"
          :key="index"
          v-lazy:background-image="todo.images.medium"
          @click="jump(todo)"
        >
          <p>
            <span>{{ todo.title }}</span>
            <span>{{ todo.year }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import topMv from './mv.json' // 本地导入的json数据
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      dataSource: [],
      mvList: [],
      title: '',
      loading: false
    }
  },
  mounted() {
    console.log(topMv.data)
    this.mvList = topMv.data
    this.getFilm()
  },
  methods: {
    // 豆瓣电影top250
    getFilm() {
      this.loading = true
      this.jsonp(
        'http://api.douban.com/v2/movie/top250?start=0&count=36',
        {
          method: 'GET'
        },
        (err, data) => {
          if (err) {
            throw new Error(err)
          } else {
            console.log(data)
            this.dataSource = data.subjects
            this.title = data.title
          }
          this.loading = false
        }
      )
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    jump(todo) {
      window.open(todo.alt, '_blank')
    }
  }
}
</script>
<style lang="less" scoped>
.about {
  h1 {
    color: #7ec699;
  }
  .mvBox {
    ul {
      display: flex;
      li {
        flex: 1;
        width: 200px;
        img {
          width: 100%;
        }
      }
    }
  }
  .topFilm {
    width: 100%;
    padding: 20px 10px;
    ul {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      li {
        position: relative;
        width: 200px;
        height: 300px;
        margin: 10px 20px;
        transition: all 500ms cubic-bezier(0.34, 1.61, 0.7, 1);
        img {
          width: 100%;
        }
        p {
          width: 100%;
          position: absolute;
          z-index: 99;
          left: 0;
          bottom: 0;
          display: flex;
          justify-content: space-around;
          color: #ffffff;
          height: 30px;
          line-height: 30px;
          background: rgba(0, 0, 0, 0.5);
        }
      }
      li:hover {
        transform: translateY(10px);
        box-shadow: 0px 0px 3px blueviolet;
      }
    }
  }
}
</style>
