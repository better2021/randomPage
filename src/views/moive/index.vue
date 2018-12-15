<template>
  <div id="movie"></div>
</template>
<script>
export default {
  data() {
    return {
      moiveList: []
    };
  },
  created() {
    this.getMoive();
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
    }
  }
};
</script>

