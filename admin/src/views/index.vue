<template>
  <div>
    <a-button type="primary" @click="testAc">测试</a-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {getInfo} from '/@/api/admin/user'

export default defineComponent({
  name: '',
  props: {},
  components: {},
  emits: [],
  setup() {
    const testAc = async () => {
      const info = await getInfo()
      console.log(info)
    }
    return {testAc}
  }
})
</script>