<template>
  <div>
    <img v-if="codeRef" :src="codeRef" :width="opt.size" :height="opt.size"/>
  </div>
</template>

<script>
import {defineComponent, ref,} from 'vue';
import qrcode from 'qrcode';

export default defineComponent({
  name: '',
  props: {opt: {}},
  components: {},
  setup(props) {
    const codeRef = ref(null);

    const createAc = () => {//生成
      const text = props.opt.text;
      if (text) {
        qrcode.toDataURL(text, props.opt, (err, data) => {
              if (data) {
                codeRef.value = data;
              }
            }
        )
      }
    };
    return {codeRef, createAc}
  }
})
</script>

<style scoped>

</style>