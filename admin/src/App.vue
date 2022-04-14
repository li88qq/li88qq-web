<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const initLocal = () => {
  dayjs.locale('zh-cn')
}

onMounted(() => {
  initLocal();
})
</script>