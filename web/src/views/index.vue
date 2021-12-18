<template>
  <div>
    <a-button type="primary" @click="test">测试</a-button>
  </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue'
import {message} from 'ant-design-vue'

export default defineComponent({
  props: {},
  components: {},
  emits: [],
  setup() {
    const test = ()=>{
      message.success('test')
    }
    return {test}
  }
})
</script>