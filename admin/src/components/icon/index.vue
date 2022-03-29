<template>
  <Icon :icon="icon" :class="compClass"></Icon>
</template>

<script lang="ts">
import {computed, defineComponent, toRaw} from 'vue'
import {Icon} from "@iconify/vue";

export default defineComponent({
  name: 'Icon',
  props: {icon: {}, btn: {}},
  components: {Icon},
  emits: [],
  setup(props) {
    const compClass = computed(() => {
      if (toRaw(props.btn)) {
        return 'anticon';
      }
    })
    return {compClass}
  }
})
</script>