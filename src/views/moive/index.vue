<template>
  <div id="movie">
    <h2>可以随意拖动的排序的图片，试试哦</h2>
    <draggable
      id="capture"
      v-model="myArray"
      :options="{group:'people',animation:500}"
      @start="dragStart=true"
      @end="dragEnd($event)"
    >
      <transition-group>
        <div v-for="(element,index) in myArray" :key="element.data.id" class="box">
          <div class="pic">
            <img v-lazy="element.data.icon" :alt="element.data.description">
          </div>
          <p>
            <span>{{ index +1 }}</span>
            {{ element.data.description }}
          </p>
        </div>
      </transition-group>
    </draggable>
    <div class="camera" @click="screen">
      <img
        src="https://i.loli.net/2018/12/28/5c2623e825a5b.png"
        alt="camera.png"
        title="camera.png"
      >
    </div>
    <!-- <canvas id="canvas"></canvas> -->
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import html2canvas from 'html2canvas'
export default {
  components: {
    draggable
  },
  data() {
    return {
      myArray: []
    }
  },
  created() {
    this.getMoive()
  },
  methods: {
    getMoive() {
      fetch('https://api.apiopen.top/videoCategory', {
        method: 'GET'
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.myArray = res.result.itemList
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    dragEnd(event) {
      // console.log(event);
      // console.log(this.myArray);
      const arr = []
      this.myArray.forEach(item => {
        arr.push(item.data.description)
      })
      console.log(arr)
    },
    // 截图
    screen() {
      /* html2canvas()中,第一个参数是要截图的Dom对象，第二个参数时渲染完成后回调的canvas对象。*/
      html2canvas(document.getElementById('capture'), {
        useCORS: true, // 用来设置是否允许使用跨域的图片进行访问
        allowTaint: true
      })
        .then(canvas => {
          const box = document.getElementById('movie')
          box.appendChild(canvas)
          console.log(canvas)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
#movie {
  width: 1000px;
  box-sizing: border-box;
  margin: 0 auto;
  animation: fadeIn 1s linear;
  > div {
    > span {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .box {
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .pic {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 200px;
      border-radius: 100%;
      overflow: hidden;
      position: relative;
       &::after{
          position: absolute;
          left: -100%;              /*改变left的值，让其相对box影藏*/
          top: 0;
          width: 30%;
          height: 100%;
          content: "";
          /* Safari 5.1 - 6.0 */
          background: -webkit-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 100%);
          /* Opera 11.1 - 12.0 */
          background: -o-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 100%);
          /* Firefox 3.6 - 15 */
          background: -moz-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 100%);
          /* 标准的语法 */
          background: linear-gradient(to right,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 50%,rgba(255,255,255,0) 100%);
          transform: skewX(-45deg);
        }
        &:hover{
          box-shadow: 3px 3px 5px #999999;
        }
        &:hover::after{
          left: 180%;
          transition: 0.8s ease-in-out;
        }

      img {
        width: 100%;
        transition: all 0.5s;
        &:hover{
          transform: scale(1.1)
        }
      }
    }
    p {
      text-align: center;
      height: 30px;
      line-height: 30px;
      span {
        color: goldenrod;
      }
    }
  }
  .camera {
    position: fixed;
    top: 30px;
    right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    transition: all 0.3s;
    img {
      width: 100%;
    }
  }
  .camera:hover {
    transform: scale(1.1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
