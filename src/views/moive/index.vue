<template>
  <div id="movie">
    <h2>可以随意拖动的排序的图片，试试哦</h2>
    <draggable
      v-model="myArray"
      :options="{group:'people',animation:500}"
      @start="dragStart=true"
      @end="dragEnd($event)"
      id="capture"
    >
      <transition-group>
        <div class="box" v-for="(element,index) in myArray" :key="element.data.id">
          <div class="pic">
            <img v-lazy="element.data.icon" :alt="element.data.description">
          </div>
          <p>
            <span>{{index +1}}</span>
            {{element.data.description}}
          </p>
        </div>
      </transition-group>
    </draggable>
    <div @click="screen" class="camera">
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
      //console.log(event);
      //console.log(this.myArray);
      let arr = []
      this.myArray.forEach(item => {
        arr.push(item.data.description)
      })
      console.log(arr)
    },
    //截图
    screen() {
      /*html2canvas()中,第一个参数是要截图的Dom对象，第二个参数时渲染完成后回调的canvas对象。*/
      html2canvas(document.getElementById('capture'), {
        useCORS: true, //用来设置是否允许使用跨域的图片进行访问
        allowTaint: true
      })
        .then(canvas => {
          let box = document.getElementById('movie')
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
      img {
        width: 100%;
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
