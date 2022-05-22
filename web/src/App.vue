<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts" setup>
import {ref, onMounted,} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {useUserStore} from '/@/store'

const userStore = useUserStore();

const initLocale = () => {
  dayjs.locale('zh-cn')
}
onMounted(() => {
  initLocale()
  userStore.init()
})
</script>