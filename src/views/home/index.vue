<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <Brothers></Brothers>
    <HelloWorld ref="hello" msg="Welcome to Your Vue.js App" @getVal="getObj"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Brothers from '@/components/Brothers.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Brothers
  },
  mounted() {
    this.$refs.hello.conMsg() // 父组件调用子组件的方法
  },
  methods: {
    // 父组件接受子组件传来的值
    getObj(val) {
      console.log(val)
    }
  }
}
</script>
