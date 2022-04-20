<template>
  <Iconify :icon="icon" :class="{anticon:btn}"></Iconify>
</template>

<script setup>
import {Icon as Iconify} from '@iconify/vue';

defineProps({
  icon: {type: String, required: true, default: ''},
  btn: {type: Boolean, required: false, default: false},
})

</script>