<template>
  <a-config-provider :locale="localeRef">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

export default defineComponent({
  name: '',
  props: {},
  components: {},
  emits: [],
  setup() {
    const localeRef = ref()
    const initLocal = () => {
      localeRef.value = zhCN
      dayjs.locale('cn')
    }
    onMounted(() => {
      initLocal()
    })
    return {localeRef}
  }
})
</script>