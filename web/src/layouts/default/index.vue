<template>
  <a-layout class="layout-container">
    <a-layout-header>
      <Header class="layout-header"></Header>
    </a-layout-header>
    <a-layout class="layout-main">
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Header from './header/index.vue'

</script>
<style lang="less" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

::v-deep(.ant-layout-header) {
  background-color: #fff;
}
</style>