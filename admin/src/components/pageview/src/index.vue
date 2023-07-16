<template>
  <div class="page-view" :class="getClass">
    <slot></slot>

    <a-card v-if="sider" size="small" class="page-view-sider">
      <slot name="sider"></slot>
    </a-card>

    <div v-if="content" class="page-view-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, computed, useSlots,} from 'vue'
import type {PageViewProps} from './type'

const props = withDefaults(defineProps<PageViewProps>(), {
  full: true
})

const {sider, content,} = useSlots()

//样式
const getClass = computed(() => {
  const clazz = ['page-view']
  if (sider) {
    clazz.push('page-view-has-sider')
  }
  if (props.full) {
    clazz.push('full')
  }
  return clazz
})

</script>
<style scoped>
.page-view {
  display: flex;
}

.page-view-has-sider {
  flex-direction: row;
}

.page-view-sider{
  margin-right: 16px;
  min-width: 200px;
  overflow: auto;
  resize: horizontal;
}

.page-view-content{
  flex: 1;
  display: flex;
  flex-direction: column;
}

.full{
  height: 100vh;
}

</style>