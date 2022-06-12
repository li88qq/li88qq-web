<template>
  <span role="img" :class="{'anticon':btn||menu,'ant-menu-item-icon':menu}">
    <Iconify :icon="icon" :height="size" :width="size" :rotate="rotate" :color="color" :flip="flip"></Iconify>
  </span>
</template>

<script setup>
import {Icon as Iconify} from '@iconify/vue'

defineProps({
  icon: {
    type: String,
  },
  size: {
    type: Number,
    default: 16,
  },
  //旋转角度
  rotate: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: ''
  },
  //horizontal vertical
  flip: {
    type: String,
    default: ''
  },
  //是否按钮
  btn: {
    type: Boolean,
    default: false,
  },
  //是否菜单
  menu: {
    type: Boolean,
    default: false,
  },
})
</script>