<template>
  <a-layout class="layout">
    <a-layout-sider>
      <a-menu v-bind="menuRt"></a-menu>
    </a-layout-sider>
    <a-layout-content class="layout-content">
        <RouterView></RouterView>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import {menus} from './data'

const {push} = useRouter()

const menuRt = reactive({
  mode:'inline',
  items:menus,
  theme:'dark',
  onSelect:({key})=>{
    push(key)
  }
})

</script>
<style scoped>
.layout{
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.layout-content{
  padding: 16px;
}
</style>