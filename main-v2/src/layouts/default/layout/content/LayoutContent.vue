<template>
  <a-layout-content style="display: flex;flex-direction: column;">
    <MenuTabs></MenuTabs>
    <RouterView>
    </RouterView>
  </a-layout-content>
</template>
<script setup lang="ts">
import {ref, reactive, computed} from 'vue'
import MenuTabs from './MenuTabs.vue'

</script>