<template>
  <div id="joke">
    <div class="moveBox" v-drag></div>
    <div class="greenBox" v-drag.limit></div>
    <h2>段子与古诗</h2>
    <div class="poetry">
      <h3>{{obj.title}}</h3>
      <p>作者：{{obj.authors}}</p>
      <div>
        <p v-for="item in list" :style="`color:${color()}`">{{item}}</p>
      </div>
    </div>
    <div class="duanzi">
      <ul>
        <li v-for="item in jokeList">
          <img :src="item.header">
          <p>{{item.text}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jokeList: [],
      obj: {},
      list: []
    }
  },
  created() {
    this.getJoke()
    this.getData()
  },
  methods: {
    //获取随机段子
    async getJoke() {
      let res = await this.axios({
        method: 'GET',
        data: {
          page: 1,
          count: 10,
          type: 'video'
        },
        url: 'https://api.apiopen.top/getJoke'
      })
      if (res.status === 200) {
        console.log(res.data.result)
        this.jokeList = res.data.result
      } else {
        console.log(res)
      }
    },
    //随机获取一首古诗
    async getData() {
      fetch('https://api.apiopen.top/recommendPoetry', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          console.log(res.result)
          this.obj = res.result
          this.list = res.result.content.split('|')
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          console.log('接口请求完成时执行，成功或失败都回执行!')
        })
    },
    color() {
      return '#' + ((Math.random() * 0xffffff) << 0).toString(16) // 随机颜色
    }
  }
}
</script>

<style lang="less" scoped>
#joke {
  // animation-name: oneAimation, twoAimation, threeAimation;
  // animation-duration: 3s, 3s, 3s;
  // animation-timing-function: linear, ease-in-out, linear;
  // animation-delay: 0s 3s, 6s;
  // animation-iteration-count: infinite, 1, 1;

  animation: godAnimation 20s linear infinite;
  .moveBox {
    position: absolute;
    left: 0;
    top: 10px;
    width: 100px;
    height: 100px;
    background: red;
  }
  .greenBox {
    position: absolute;
    left: 0;
    top: 120px;
    width: 100px;
    height: 100px;
    background: green;
  }
  h2 {
    color: cadetblue;
  }
  .poetry {
    p {
      line-height: 30px;
    }
  }
  .duanzi {
    ul {
      display: flex;
      align-items: center;
      flex-direction: column;
      li {
        width: 300px;
        border: 1px solid #f1f1f1;
        margin: 10px 0;
        box-shadow: 3px 3px 5px #dddddd;
        padding: 5px;
        img {
          width: 100px;
        }
      }
    }
  }
}

@keyframes godAnimation {
  0% {
    background: cadetblue;
  }
  25% {
    background: #f60;
  }
  50% {
    background: green;
  }
  75% {
    background: gold;
  }
  100% {
    background: rgb(194, 79, 205);
  }
}

// @keyframes oneAimation {
//   0% {
//     background: cadetblue;
//   }
//   100% {
//     background: rgb(194, 79, 205);
//   }
// }
// @keyframes twoAimation {
//   0% {
//     background: #ff0000;
//   }
//   100% {
//     background: chocolate;
//   }
// }
// @keyframes threeAimation {
//   0% {
//     background: green;
//   }
//   100% {
//     background: gold;
//   }
// }
</style>
