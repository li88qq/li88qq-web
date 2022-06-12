<template>
  <a-layout-header class="flex flex-row bg-header">
    <div class="flex-1 flex flex-row">
      <div class="flex flex-row justify-center items-center">
        <img :src="Logo" class="h-10">
        <div class="pl-2 text-base font-bold">{{ VITE_APP_SHORTCUT }}</div>
      </div>
    </div>
    <div class="flex-1 flex flex-row justify-end items-center space-x-2">
      <a-button type="default" @click="screenFullAc" title="全屏">
        <template #icon>
          <Icon :icon="'ant-design:fullscreen-outlined'" :size="20" btn></Icon>
        </template>
      </a-button>
      <a-switch v-model:checked="defaultThemeRef" @change="changeModeAc" title="切换模式">
        <template #checkedChildren>
          <Icon :icon="'bi:sun-fill'" color="gold" btn></Icon>
        </template>
        <template #unCheckedChildren>
          <Icon :icon="'bi:moon-stars-fill'" :rotate="180" color="gold" btn flip="horizontal"></Icon>
        </template>
      </a-switch>
    </div>
  </a-layout-header>
</template>

<script setup>
import {ref, reactive, onMounted,} from 'vue'
import Logo from '/@/assets/logo.png'
import {Icon} from '/@/components/icon'
import {useScreenFull} from '/@/utils/screenFullUtil'
import {useThemeStore} from '/@/store'

const {screenToggle} = useScreenFull()
const {initTheme, toggle: toggleTheme} = useThemeStore()
const {VITE_APP_SHORTCUT} = import.meta.env

//全屏
const screenFullAc = () => {
  screenToggle()
}
//模式
const defaultThemeRef = ref(false)
//切换模式
const changeModeAc = async (checked, event) => {
  await toggleTheme(checked);
  defaultThemeRef.value = checked
}
//初始化模式
const initThemeAc = async () => {
  const theme = initTheme();
  if (!theme) {
    await toggleTheme(false);
  }
  defaultThemeRef.value = theme;
}

onMounted(() => {
  initThemeAc();
})
</script>