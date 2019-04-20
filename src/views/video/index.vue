<template>
  <div id="video">
    <div class="box">
      <ul>
        <li
          v-for="(item,index) in dataSource"
          :key="index"
          :style="`background:url(${item.data.content.data.cover.detail}) no-repeat`"
        >
          <img src="../../assets/img/playing.png" class="pic" @click="play(item,index)">
          <div class="text">
            <h3>{{ item.data.content.data.title }}</h3>
            <p>{{ item.data.content.data.description }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="visible" class="model" @click="close($event)">
      <div class="player">
        <video
          ref="videoPlay"
          controls
          preload
          autoplay
          :src="videoSrc"
          color="#000000"
        ></video>
        <span v-show="leftShow" class="left" @click="left">
          <img src="../../assets/img/left.png">
        </span>
        <span v-show="rightShow" class="right" @click="right">
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
      videoSrc: '',
      currentIndex: 0, // 当前的视频索引
      dataSource: []
    }
  },
  computed: {
    leftShow() {
      if (this.currentIndex === 1) {
        return false
      } else {
        return true
      }
    },
    rightShow() {
      if (this.currentIndex === this.dataSource.length - 1) {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    this.getVideo()
  },
  mounted() {
    document.onkeydown = e => {
      const event = e || window.event
      const videoPlay = this.$refs.videoPlay
      console.log(event.keyCode)
      // console.log(videoPlay.paused);
      if (event.keyCode === 32) {
        if (videoPlay.paused) {
          videoPlay.play()
        } else {
          videoPlay.pause()
        }
      } else if (event.keyCode === 13) {
        console.log(document.webkitIsFullScreen)
        // const element = document.documentElement
        if (document.webkitIsFullScreen) {
          document.webkitCancelFullScreen() // 退出全屏
        } else {
          // element.webkitRequestFullScreen(); //页面进入全屏
          videoPlay.webkitRequestFullScreen() // 视频进入全屏
        }
      }
      videoPlay.addEventListener(
        'ended',
        function() {
          document.webkitCancelFullScreen() // 播放完毕自动退出全屏
        },
        false
      )
    }
  },
  methods: {
    // 开眼视频
    async getVideo() {
      const res = await this.axios({
        url: 'https://api.apiopen.top/todayVideo',
        method: 'GET',
        data: {}
      })
      if (res.status === 200) {
        // console.log(res.data.result);
        this.dataSource = res.data.result.filter(item => item.type === 'followCard')
      } else {
        console.log(res)
      }
    },
    play(item, index) {
      // console.log(item.data.content.data.playUrl);
      this.visible = true
      this.videoSrc = item.data.content.data.playUrl
      this.currentIndex = index
    },
    close(e) {
      // console.log(e.target.className);
      if (e.target.className === 'model') {
        this.visible = false
        this.$refs.videoPlay.pause() // 暂停
      }
    },
    left() {
      this.currentIndex--
      if (this.dataSource[this.currentIndex].data.content) {
        this.videoSrc = this.dataSource[
          this.currentIndex
        ].data.content.data.playUrl
      }
      // console.log(this.videoSrc);
    },
    right() {
      this.currentIndex++
      if (this.dataSource[this.currentIndex].data.content) {
        this.videoSrc = this.dataSource[
          this.currentIndex
        ].data.content.data.playUrl
      }
      // console.log(this.videoSrc);
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
