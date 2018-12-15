<template>
  <div class="wrapper">
    <h2>
      {{dataSource.title}}
      <span>（总共{{dataSource.total}}部）</span>
    </h2>
    <ul>
      <li v-for="item in dataSource.subjects">
        <a :href="item.alt" target="_blank">
          <img :src="item.images.large">
        </a>
        <p>{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSource: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //豆瓣正在热映电影
    getData() {
      this.jsonp(
        "https://api.douban.com/v2/movie/in_theaters?start=0&count=30",
        { method: "GET" },
        (err, data) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          } else {
            console.log(data);
            this.dataSource = data;
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 1220px;
  margin: 0 auto;
  overflow: hidden;
  h2 {
    color: #41b883;
  }
  ul {
    padding: 10px 0px;
    list-style: none;
    li {
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
    }
    li:hover {
      box-shadow: 3px 3px 0px rgba(65, 184, 131, 0.5);
      transform: scale(1.2);
    }
  }
}
</style>