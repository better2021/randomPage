
/**
 * 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
 * 一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
 * 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
 * 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
 * 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
 */

export const mymixin = {
  data() {
    return {
      txt: 'minxi测试',
      test: '哈哈哈minxi'
    }
  },
  created() {},
  mounted() {
    console.log(this.txt)
  },
  methods: {
    showTime() {
      console.log(new Date().toLocaleDateString())
    }
  }
}

export const mixin1 = {
  data() {
    return {
      time: Date.now()
    }
  },
  mounted() {
    console.log('minxi1')
  }
}
