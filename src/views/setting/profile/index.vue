<template>
  <div class="container-card">
    <a-tabs v-model:activeKey="activeKey" tab-position="left">
      <a-tab-pane key="profile" tab="基本信息">
        <Profile></Profile>
      </a-tab-pane>
      <a-tab-pane key="password" tab="修改密码" force-render>
        <Password></Password>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import Profile from "./comp/Profile.vue";
import Password from "./comp/Password.vue";

export default defineComponent({
  name: '',
  props: {},
  components: {Profile, Password},
  setup() {
    const activeKey = ref('profile');
    return {activeKey}
  }
})
</script>

<style scoped>

</style>