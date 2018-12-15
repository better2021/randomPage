<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import topMv from "./mv.json"; //本地导入的json数据
export default {
  data() {
    return {
      dataSource: []
    };
  },
  mounted() {
    console.log(topMv);
    this.getFilm();
  },
  methods: {
    //豆瓣电影top250
    getFilm() {
      this.jsonp(
        "http://api.douban.com/v2/movie/top250?start=0&count=50",
        {
          method: "GET"
        },
        (err, data) => {
          if (err) {
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
.about {
  h1 {
    color: #7ec699;
  }
}
</style>
