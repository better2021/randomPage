<template>
  <div id="video">
    <div class="box">
      <ul>
        <li
          v-for="(item,index) in dataSource"
          v-if="item.type==='followCard'"
          :key="index"
          :style="`background:url(${item.data.content.data.cover.detail}) no-repeat`"
        >
          <img src="../../assets/img/playing.png" class="pic" @click="play(item,index)">
          <div class="text">
            <h3>{{item.data.content.data.title}}</h3>
            <p>{{item.data.content.data.description}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="model" v-show="visible" @click="close($event)">
      <div class="player">
        <video
          controls
          preload
          autoplay
          :src="videoSrc"
          :poster="picture"
          color="#000000"
          ref="videoPlay"
        ></video>
        <span class="left" v-show="leftShow" @click="left">
          <img src="../../assets/img/left.png">
        </span>
        <span class="right" v-show="rightShow" @click="right">
          <img src="../../assets/img/right.png">
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      videoSrc: "",
      currentIndex: 0, //当前的视频索引
      dataSource: []
    };
  },
  created() {
    this.getVideo();
  },
  mounted() {
    document.onkeydown = e => {
      let event = e || window.event;
      let videoPlay = this.$refs.videoPlay;
      console.log(event.keyCode);
      //console.log(videoPlay.paused);
      if (event.keyCode === 32) {
        if (videoPlay.paused) {
          videoPlay.play();
        } else {
          videoPlay.pause();
        }
      } else if (event.keyCode === 13) {
        console.log(document.webkitIsFullScreen);
        let element = document.documentElement;
        if (document.webkitIsFullScreen) {
          document.webkitCancelFullScreen(); //退出全屏
        } else {
          //element.webkitRequestFullScreen(); //页面进入全屏
          videoPlay.webkitRequestFullScreen(); //视频进入全屏
        }
      }
      videoPlay.addEventListener(
        "ended",
        function() {
          document.webkitCancelFullScreen(); //播放完毕自动退出全屏
        },
        false
      );
    };
  },
  computed: {
    leftShow() {
      if (this.currentIndex === 1) {
        return false;
      } else {
        return true;
      }
    },
    rightShow() {
      if (this.currentIndex === this.dataSource.length - 1) {
        return false;
      } else {
        return true;
      }
    },
    picture() {
      if (this.visible) {
        if (this.dataSource[this.currentIndex].data.content) {
          return this.dataSource[this.currentIndex].data.content.data.cover
            .detail;
        }
      }
    }
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
        //console.log(res.data.result);
        this.dataSource = res.data.result;
      } else {
        console.log(res);
      }
    },
    play(item, index) {
      //console.log(item.data.content.data.playUrl);
      this.visible = true;
      this.videoSrc = item.data.content.data.playUrl;
      this.currentIndex = index;
    },
    close(e) {
      //console.log(e.target.className);
      if (e.target.className === "model") {
        this.visible = false;
        this.$refs.videoPlay.pause(); //暂停
      }
    },
    left() {
      this.currentIndex--;
      if (this.dataSource[this.currentIndex].data.content) {
        this.videoSrc = this.dataSource[
          this.currentIndex
        ].data.content.data.playUrl;
      }
      //console.log(this.videoSrc);
    },
    right() {
      this.currentIndex++;
      if (this.dataSource[this.currentIndex].data.content) {
        this.videoSrc = this.dataSource[
          this.currentIndex
        ].data.content.data.playUrl;
      }
      //console.log(this.videoSrc);
    }
  }
};
</script>
<style lang="less" scoped>
#video {
  animation: fadeIn 1s ease-out;
  .box {
    width: 1000px;
    margin: 0 auto;
    background: url("https://wallpaper.infinitynewtab.com/wallpaper/2679.jpg")
      center;
    background-size: cover;
    ul {
      width: 1000px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 232px;
        overflow: hidden;
        border: 1px solid #f5f5f5;
        background-size: contain !important;
        margin: 10px;
        border-radius: 3px;
        transition: all 0.5s;
        .pic {
          width: 100px;
          cursor: pointer;
          transition: all 0.5s;
        }
        .pic:hover {
          transform: scale(1.2) rotate(-6deg);
        }
        .text {
          position: absolute;
          z-index: 99;
          left: 0;
          bottom: 0;
          padding: 10px 5px;
          background: rgba(0, 0, 0, 0.6);
          h3 {
            font-size: 14px;
            color: #f5f5f5;
          }
          p {
            color: #f5f5f5;
            line-height: 20px;
            font-size: 12px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; //2行之后省略号
            -webkit-box-orient: vertical;
          }
        }
      }
      li:hover {
        transform: translateY(5px) rotate(3deg);
      }
    }
  }
  .model {
    position: fixed;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    .player {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 800px;
      height: auto;
      border: 3px #dddddd solid;
      border-radius: 3px;
      video {
        width: 800px;
      }
      .left {
        position: absolute;
        left: -100px;
      }
      .right {
        position: absolute;
        right: -100px;
      }
      span {
        img {
          width: 80px;
        }
      }
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-50px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}
</style>


