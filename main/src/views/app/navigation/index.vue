<template>
  <div class="flex flex-col p-4">
    <a-card size="small">
      <a-row>
        <a-col :span="8" :offset="8">
          <a-input-search placeholder="请输入名称搜索" enter-button @search="searchAc" allowClear/>
        </a-col>
      </a-row>
    </a-card>
    <a-card size="small" class="flex-1 mt-4">
      <template v-for="item in navsRef" :key="item.name">
        <a-card-grid style="width: 20%; text-align: center" @click="toPath(item.url)">
          <div class="flex flex-row items-center">
            <div class="h-8 w-8">
              <a-image v-if="item.icon" :fallback="DEFAULT_IMG" :src="item.icon" :preview="false"/>
            </div>
            <div class="flex-1 flex flex-col justify-between items-center">
              <div class="text-lg font-bold">
                {{ item.title }}
              </div>
              <div class="self-end text-gray-400 text-sm">
                {{ item.remark }}
              </div>
            </div>
          </div>
        </a-card-grid>
      </template>
    </a-card>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted,} from 'vue'
import {navigation} from './data'
import DEFAULT_IMG from '/default_img.png'

const navsRef = ref([])
const toPath = (url) => {
  window.open(url, '_blank')
}
const searchAc = (value, event) => {
  value = value.trim()
  if (value === '') {
    navsRef.value = navigation
  } else {
    navsRef.value = navigation.filter(item => item.name.indexOf(value) !== -1)
  }
}

onMounted(() => {
  navsRef.value = navigation
})
</script>