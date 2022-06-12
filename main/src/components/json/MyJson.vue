<template>
  <ul>
    <template v-for="(item,index) in data.v" :key="index">
      <li v-if="item.t==='object' || item.t === 'array'" v-show="isShow">
        <MyJson :data="item"></MyJson>
      </li>
      <li v-else-if="item.t==='start'||item.t==='end'">
        <span v-html="item.s"></span>
        <span class="key">{{ item.k }}</span>
        <span>{{ item.m }}</span>
        <template v-if="item.t==='start'">
          <Icon :icon="isShow?'ant-design:minus-circle-outlined':'ant-design:plus-circle-outlined'" @click="show" btn></Icon>
        </template>
        <span v-show="!isShow">{{ item.r }}</span>
        <span :class="item.t">{{ item.v }}</span>
        <span>{{ item.d }}</span>
      </li>
      <li v-else v-show="isShow">
        <span v-html="item.s"></span>
        <span class="key">{{ item.k }}</span>
        <span>{{ item.m }}</span>
        <span :class="item.t">{{ item.v }}</span>
        <span>{{ item.d }}</span>
      </li>
    </template>
  </ul>
</template>

<script setup>
import {ref} from 'vue'
import {Icon} from '/@/components/icon'

const props = defineProps({
  data: {
  }
})

const isShow = ref(true)
const show = () => {
  isShow.value = !isShow.value
}
</script>

<style scoped>
::v-deep(ul) {
  padding: 0;
}

li {
  list-style: none;
}

.key {
  color: #92278f;
  font-weight: bold;
}

.number {
  color: #25aae2;
}

.string {
  color: #3ab54a;
}

.boolean {
  color: #f98280;
}

.null {
  color: #ff0000;
}

.hide ul {
  display: none;
}
</style>