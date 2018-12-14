<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //网易云音乐
    getData() {
      this.axios({
        method: "GET",
        url: "https://163.fczbl.vip/top/mv?limit=10",
        data: {}
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("接口请求完成时执行，成功或失败都回执行");
        });
    },
    //开眼视频
    async getVideo() {
      let res = await this.axios({
        url: "https://api.apiopen.top/todayVideo",
        method: "GET",
        data: {}
      });
      if (res.status == 200) {
        console.log(res.data.result);
        console.log(res.data.result[15].data.content.data.playUrl);
      } else {
        console.log(res);
      }
    },
    //获取随机段子
    async getJoke() {
      let res = await this.axios({
        method: "GET",
        data: {
          page: 1,
          count: 10,
          type: "video"
        },
        url: "https://api.apiopen.top/getJoke"
      });
      if (res.status === 200) {
        console.log(res.data.result);
      } else {
        console.log(res);
      }
    },
    //豆瓣电影top250
    getFilm() {
      this.jsonp(
        "http://api.douban.com/v2/movie/top250?start=0&count=50",
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
.about {
  h1 {
    color: #7ec699;
  }
}
</style>
