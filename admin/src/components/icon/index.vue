<template>
  <Iconify :icon="icon" :class="compClass"></Iconify>
</template>

<script lang="ts">
import {computed, defineComponent, toRaw} from 'vue'
import {Icon as Iconify} from "@iconify/vue";

export default defineComponent({
  name: 'Icon',
  props: {icon: {}, btn: {}},
  components: {Iconify},
  emits: [],
  setup(props) {
    const compClass = computed(() => {
      if (toRaw(props).btn) {
        return 'anticon';
      }
    })
    return {compClass}
  }
})
</script>