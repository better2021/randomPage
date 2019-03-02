<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <Brothers></Brothers>
    <HelloWorld msg="Welcome to Your Vue.js App" ref="hello" @getVal="getObj"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Brothers from "@/components/Brothers.vue";
// import { obj as app } from "../../libs/test.js";
import app from "../../libs/test.js";

export default {
  name: "home",
  components: {
    HelloWorld,
    Brothers
  },
  mounted() {
    app.getName();
    this.$refs.hello.conMsg(); // 父组件调用子组件的方法
  },
  methods: {
    // 父组件接受子组件传来的值
    getObj(val) {
      console.log(val);
    }
  }
};
</script>
