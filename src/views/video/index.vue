<template>
  <div id="video"></div>
</template>
<script>
export default {
  data() {
    return {
      dataSource: []
    };
  },
  created() {
    this.getVideo();
  },
  methods: {
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>


