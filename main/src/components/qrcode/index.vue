<template>
  <div>
    <img v-if="codeRef" :src="codeRef" :width="opt.size" :height="opt.size"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import qrcode from 'qrcode';

const props = defineProps({
  opt: {}
})

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
}
defineExpose({
  createAc
})
</script>