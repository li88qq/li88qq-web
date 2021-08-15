<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script>
import {defineComponent} from 'vue';
import Layout from '/@/layouts/index.vue'

export default defineComponent({
  name: '',
  props: {},
  components: {Layout},
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>