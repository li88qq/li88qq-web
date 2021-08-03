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
          <MinusCircleOutlined v-if="isShow" @click="show"/>
          <PlusCircleOutlined v-else @click="show"/>
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

<script>
import {defineComponent, ref} from 'vue'

import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons-vue'

export default defineComponent({
  name:'MyJson',
  props: {data: {}},
  components: {PlusCircleOutlined, MinusCircleOutlined},
  setup() {
    const isShow = ref(true)
    const show = () => {
      isShow.value = !isShow.value
    }
    return {isShow, show}
  }
})
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

.row {
}

.hide ul {
  display: none;
}
</style>