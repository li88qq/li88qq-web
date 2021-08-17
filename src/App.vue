<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import {defineComponent, onMounted} from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import {loginStore} from "/@/store";

export default defineComponent({
  name: '',
  components: {},
  emits: [],
  setup() {
    const initLocal = () => {
      moment.locale('zh-cn');
    };

    onMounted(() => {
      initLocal();
      loginStore.commit('check');
    })
    return {zhCN}
  }
})
</script>

<style scoped>

</style>