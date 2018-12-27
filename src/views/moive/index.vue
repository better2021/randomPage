<template>
  <div id="movie">
    <draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <transition-group>
        <div class="box" v-for="(element,index) in myArray" :key="element.data.id">
          <div class="pic">
            <img :src="element.data.icon" :alt="element.data.description">
          </div>
          <p>
            <span>{{index +1}}</span>
            {{element.data.description}}
          </p>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { Promise } from "q";
export default {
  components: {
    draggable
  },
  data() {
    return {
      myArray: []
    };
  },
  created() {
    this.getMoive();
  },
  methods: {
    getMoive() {
      console.log(1212);
      fetch("https://api.apiopen.top/videoCategory", {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.myArray = res.result.itemList;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
#movie {
  width: 1000px;
  box-sizing: border-box;
  margin: 0 auto;
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
}
</style>


