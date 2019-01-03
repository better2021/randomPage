<template>
  <div
    class="wrapper"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(255, 255, 255, 0.6)"
  >
    <h2>
      {{dataSource.title}}
      （总共
      <span id="totalNum"></span>部）
    </h2>
    <el-rate v-model="value3" show-text></el-rate>
    <ul>
      <li v-for="item in dataSource.subjects">
        <p class="tags">
          <span v-for="todo in item.genres" :style="`background:${color()}`">{{todo}}</span>
        </p>
        <a :href="item.alt" target="_blank">
          <img v-lazy="item.images.large">
        </a>
        <p>{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import CountUp from "countup";
export default {
  data() {
    return {
      loading: false,
      dataSource: {},
      value3: 4
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //豆瓣正在热映电影
    getData() {
      this.loading = true;
      this.jsonp(
        "https://api.douban.com/v2/movie/in_theaters?start=0&count=30",
        { method: "GET" },
        (err, data) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          } else {
            //console.log(data);
            let numAnim = new CountUp("totalNum", 0, data.total);
            numAnim.start();
            this.dataSource = data;
          }
          this.loading = false;
        }
      );
    },
    color() {
      return "#" + ((Math.random() * 0xffffff) << 0).toString(16); // 随机颜色
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 1220px;
  margin: 0 auto;
  overflow: hidden;
  animation: fadeIn 2s ease-in-out;
  h2 {
    color: #41b883;
  }
  ul {
    padding: 10px 0px;
    list-style: none;
    li {
      position: relative;
      float: left;
      width: 300px;
      margin: 15px 50px;
      border: 1px #f1f1f1 solid;
      border-radius: 5px;
      box-shadow: 0px 0px 5px #666;
      transition: all 0.5s;
      p {
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
      img {
        width: 300px;
        height: 400px;
      }
      .tags {
        position: absolute;
        left: 0;
        top: 0;
        span {
          display: inline-block;
          width: 60px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          margin-left: 5px;
          border-radius: 5px;
          color: #f1f1f1;
        }
      }
    }
    li:hover {
      box-shadow: 3px 3px 0px rgba(65, 184, 131, 0.5);
      transform: scale(1.1);
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>