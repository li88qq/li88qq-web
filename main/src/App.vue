<template>
  <a-config-provider :locale="zhCN">
    <Layout>
      <router-view></router-view>
    </Layout>
  </a-config-provider>
</template>

<script setup>
import {ref, reactive, onMounted,} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import Layout from '/@/layouts/default/index.vue'

const initLocale = ()=>{
  dayjs.locale('zh-cn');
}

onMounted(()=>{
  initLocale()
})
</script>