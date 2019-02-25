<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

// import { obj as app } from "../../libs/test.js";
import app from "../../libs/test.js";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    app.getName();
  }
};
</script>
