<template>
  <div>
    <p>{{ $store.state.num }}</p>
    <p>兄弟组件之间的通信{{ message }}{{ number }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      number: 0
    }
  },
  created() {
    // 用$root.$on 可以接受兄弟组件通过getMsg事件传过来的值
    // this.$root.$on("getMsg", val => {
    //   console.log(val);
    //   this.message = val;
    //   this.number += 1;
    // });

    // eventBus 和 root是一样的，eventBus是在Vue原型上创建的新实例
    this.$eventBus.$on('getMsg', val => {
      console.log(val)
      this.message = val
      this.number += 1
    })
  },
  methods: {}
}
</script>
