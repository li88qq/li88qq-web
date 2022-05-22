<template>
  <div class="login-footer">
    <div class="footer-header">
      <a target="_blank" :href="envRt.beiAnUrl" class="footer-header-a">
        <img src="/beian.png">
        <p>{{ envRt.beiAnName }}</p>
      </a>
      <a :href="envRt.icpUrl" target="_blank">
        <p>{{ envRt.icpName }}</p>
      </a>
    </div>
    <div><p>{{ envRt.copyright }}</p></div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'

interface Env {
  beiAnUrl: string,
  beiAnName: string,
  icpName: string,
  icpUrl: string,
  copyright: string,
}

const {
  VITE_BEIAN_NAME, VITE_BEIAN_CODE, VITE_BEIAN_URL, VITE_ICP_NAME, VITE_ICP_URL, VITE_COPYRIGHT
} = import.meta.env

const envRt = reactive(<Env>{
  beiAnUrl: `${VITE_BEIAN_URL}${VITE_BEIAN_CODE}`,
  beiAnName: `${VITE_BEIAN_NAME} ${VITE_BEIAN_CODE}号`,
  icpName: VITE_ICP_NAME,
  icpUrl: VITE_ICP_URL,
  copyright: VITE_COPYRIGHT,
})

</script>
<style scoped lang="less">
.login-footer {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-header {
  display: flex;
  flex-direction: row;
}

.footer-header a {
  color: rgba(0, 0, 0, 0.85);
}

.footer-header-a p {
  display: inline-block;
  margin-right: 12px;
}
</style>