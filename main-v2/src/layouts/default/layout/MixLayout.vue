<template>
  <a-layout>
    <a-layout-header class="layout-header" :style="getTopStyle">
      <HeaderLeft></HeaderLeft>
      <a-menu mode="horizontal" :items="topMenu2" :style="getTopStyle" theme="dark"></a-menu>
      <HeaderRight></HeaderRight>
    </a-layout-header>
    <a-layout>
      <a-layout-sider collapsible :style="getSiderStyle">
        <a-menu mode="inline" :items="siderMenu" theme="dark" :style="getSiderStyle"></a-menu>
      </a-layout-sider>
      <LayoutContent></LayoutContent>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {ref, reactive,computed} from 'vue'
import LayoutContent from './content/LayoutContent.vue'
import HeaderLeft from './header/HeaderLeft.vue'
import HeaderRight from './header/HeaderRight.vue'
import {topMenu2,siderMenu} from './menu/data'
import {getTopStyle,getSiderStyle} from './hooks'


</script>
<style scoped>
.layout-header{
  padding: 0;display: flex;flex-direction: row;align-items: center;
}
</style>