<template>
  <PageView full>
    <template #sider>
      <div>
        <a-input/>
        <a-tree></a-tree>
        <VueDraggable
            v-model="dataRef"
            item-key="id"
            :animation="200"
            ghost-class="draggable-ghost"
        >
          <template #item="{element}">
            <div class="draggable-item">{{element.id}}</div>
          </template>
        </VueDraggable>
      </div>
    </template>
    <template #body>
     <BasicTable></BasicTable>
    </template>
  </PageView>
</template>
<script setup lang="ts">
import {ref,reactive,onMounted} from 'vue'
import {PageView} from '@/components/pageview'
import {BasicTable} from '@/components/table'
import VueDraggable from 'vuedraggable'

const dataRef = ref([])

onMounted(()=>{
  for(let i = 0;i<10;i++){
    dataRef.value.push({id:i});
  }
})

</script>
<style scoped>
.draggable-item{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  padding: 8px;
  margin: 8px;
}
.draggable-ghost{
  opacity: 0.5;
  background-color: #eee;
}
</style>