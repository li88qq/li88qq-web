<template>
  <div class="flex flex-col justify-center items-center py-4 footer">
    <div class="flex-1 flex flex-row justify-center items-center ">
      <a target="_blank" :href="envRt.beiAnUrl" class="no-underline ">
        <img src="/beian.png">
        {{ envRt.beiAnName }}
      </a>
      <a :href="envRt.icpUrl" target="_blank" class="no-underline pl-4">
        {{ envRt.icpName }}
      </a>
    </div>
    <div class="flex-1 ">
      {{ envRt.copyright }}
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'

const {
  VITE_BEIAN_NAME, VITE_BEIAN_CODE, VITE_BEIAN_URL, VITE_ICP_NAME, VITE_ICP_URL, VITE_COPYRIGHT
} = import.meta.env

const envRt = reactive({
  beiAnUrl: `${VITE_BEIAN_URL}${VITE_BEIAN_CODE}`,
  beiAnName: `${VITE_BEIAN_NAME} ${VITE_BEIAN_CODE}号`,
  icpName: VITE_ICP_NAME,
  icpUrl: VITE_ICP_URL,
  copyright: VITE_COPYRIGHT,
})

</script>