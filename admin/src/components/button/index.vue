<template>
  <a-button :type="type" :danger="danger" @click="click">
    <template #icon v-if="icon">
      <Icon :icon="icon" :btn="true"></Icon>
    </template>
    <slot></slot>
  </a-button>
</template>

<script setup>
import Icon from '/@/components/icon/index.vue'

defineProps(['icon', 'type', 'danger', 'click'])
</script>