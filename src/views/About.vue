<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import topMv from "../assets/mv.json"; //本地导入的json数据
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {
    console.log(topMv);
    this.getMoive();
    this.getData();
    this.getMusic();
  },
  methods: {
    //获取动漫海贼王
    getMoive() {
      this.jsonp(
        "http://cache.video.iqiyi.com/jp/avlist/202861101/1/",
        {
          method: "GET"
        },
        (err, data) => {
          if (err) {
            throw new Error(err);
          } else {
            console.log(data);
          }
        }
      );
    },
    //获取音乐排行榜
    getMusic() {
      this.axios({
        method: "GET",
        url: "https://api.apiopen.top/musicRankings",
        data: {}
      })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data.result);
          } else {
            console.log(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          console.log("接口请求完成时执行，成功或失败都回执行");
        });
    },
    //随机获取一首古诗
    getData() {
      fetch({
        method: "GET",
        url: "https://api.apiopen.top/recommendPoetry", //https://api.apiopen.top/musicRankings
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
