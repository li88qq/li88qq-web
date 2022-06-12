<template>
  <a-result status="404" title="404" sub-title="功能开发中...">
    <template #extra>
      <a-button type="primary">返回首页</a-button>
    </template>
  </a-result>
</template>

<script setup>
import {ref, reactive, onMounted,} from 'vue'
</script>