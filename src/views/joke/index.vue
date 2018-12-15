<template>
  <div id="joke"></div>
</template>
<script>
export default {
  data() {
    return {
      jokeList: []
    };
  },
  created() {
    this.getJoke();
    this.getData();
  },
  methods: {
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
    //随机获取一首古诗
    async getData() {
      fetch("https://api.apiopen.top/recommendPoetry", {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(res => {
          console.log(res);
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

