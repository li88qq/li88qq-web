<template>
  <a-config-provider :theme="{algorithm:getAlgorithm,token:{colorPrimary:appStore.colorPrimary}}">
    <a-watermark :content="appStore.watermark.content" v-if="appStore.watermark.show" :font="getFont">
      <RouterView></RouterView>
    </a-watermark>
    <RouterView v-else></RouterView>
  </a-config-provider>
</template>
<script setup lang="ts">
import {reactive, computed, watch} from 'vue'
import {useAppStore} from '@/store'
import {theme} from 'ant-design-vue';

const {darkAlgorithm, defaultAlgorithm} = theme;

const appStore = useAppStore()

//主题
const getAlgorithm = computed(() => {
  return appStore.theme === 'dark' ? darkAlgorithm : defaultAlgorithm
})

//灰色模式
watch(() => appStore.gray, value => {
  const html = document.getElementsByTagName('html')[0];
  if (value) {
    html.classList.add('gray')
  } else {
    html.classList.remove('gray')
  }
})

//色弱模式
watch(() => appStore.invert, value => {
  const html = document.getElementsByTagName('html')[0];
  if (value) {
    html.classList.add('invert')
  } else {
    html.classList.remove('invert')
  }
})

//水印颜色
const getFont =computed(()=>{
  const color = appStore.theme==='dark'?'rgba(255,255,255,0.25)':'rgba(0,0,0,0.25)'
  return {
    color:color
  }
})

</script>