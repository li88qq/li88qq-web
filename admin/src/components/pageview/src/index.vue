<template>
  <div>
    <slot></slot>
    <slot name="sider">

    </slot>
    <slot name="content">

    </slot>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,useSlots,} from 'vue'

const { sider,table, } = useSlots();

</script>