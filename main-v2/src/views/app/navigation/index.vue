<template>
  <PageView full>
    <template #sider>
      <div>
        <a-input/>
        <a-tree></a-tree>
      </div>
    </template>
    <template #body>
     <BasicTable></BasicTable>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import {ref,reactive} from 'vue'
import {PageView} from '@/components/pageview'
import {BasicTable} from '@/components/table'

</script>