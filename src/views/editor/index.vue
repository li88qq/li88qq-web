<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
import {defineComponent, onMounted} from 'vue';
import Vditor from 'vditor';
import "vditor/dist/index.css";

export default defineComponent({
  name: '',
  props: {},
  components: {Vditor},
  setup() {
    let vditor = null;

    const initEditor = () => {
      vditor = new Vditor('editor', {})
    }

    onMounted(() => {
      initEditor();
    })
    return {}
  }
})
</script>

<style scoped>

</style>