<template>
  <div class="slot-demo">
    <slot name="haha">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="handleClick(item)">
          <i class="el-icon-edit"></i>
          <i class="el-icon-share"></i>
          <i class="el-icon-delete"></i>
          <span style="color:#f00">{{ item }}</span>
        </li>
      </ul>
    </slot>
    <slot name="yaya">
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick(item) {
      console.log(item, '---')
    }
  }
}
</script>
