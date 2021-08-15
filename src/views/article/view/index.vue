<template>
  <a-modal
      :visible="visible"
      @ok="closeAc"
      @cancel="closeAc"
      :width="1000"
      destroy-on-close
      :body-style="{height:'850px'}"
      :footer="null"
      :style ="{top:'24px',}"
  >
    <View :id="id"></View>
  </a-modal>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue';
import View from './comp/View.vue'

export default defineComponent({
  name: '',
  props: {id: {}},
  components: {View},
  setup() {
    const visible = ref(false);
    const showAc = () => {
      visible.value = true;
    };
    const closeAc = () => {
      visible.value = false;
    };
    return {visible, showAc, closeAc,}
  }
})
</script>

<style scoped>

</style>