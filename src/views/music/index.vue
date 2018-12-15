<template>
  <div id="music"></div>
</template>
<script>
export default {
  data() {
    return {
      musicList: []
    };
  },
  created() {
    this.getMusic();
  },
  methods: {
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
          console.log("接口请求完成时执行，成功或失败都回执行!");
        });
    }
  }
};
</script>
<style lang="less" scoped>
</style>


