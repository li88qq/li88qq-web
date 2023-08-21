<template>
  <div class="view-wrapper" :class="getClass">
    <template v-if="$sider">
      <a-card size="small" class="view-sider" v-show="toggleShow">
        <slot name="sider"></slot>
      </a-card>
    </template>

    <template v-if="$body">
      <div class="view-body">
        <slot name="body"></slot>
        <div class="body-toggle" v-if="$sider" @click="showAc">
          <MenuUnfoldOutlined/>
        </div>
      </div>
    </template>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, useSlots, useAttrs, computed} from 'vue'
import type {PageViewProps} from './types'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue'

const props = withDefaults(defineProps<PageViewProps>(), {})

const {sider: $sider, body: $body, tabs: $tabs} = useSlots()

//是否显示侧边
const toggleShow = ref(true)
//控制是否显示侧边
const showAc = ()=>{
  toggleShow.value = !toggleShow.value
}

//外层样式
const getClass = computed(() => {
  const clazz = []
  if ($sider) {
    clazz.push('view-has-sider')
  }
  const {full} = props
  if (full) {
    clazz.push('view-full')
  }
  return clazz
})

</script>
<style scoped>
/*最外层*/
.view-wrapper {
  display: flex;
  flex-direction: column;
  padding: 12px;
}

/*最外层,有侧边*/
.view-has-sider {
  display: flex;
  flex-direction: row;
}

/*最外层,全屏 64+36+1+1+6 有点奇怪*/
.view-full {
  height: calc(100vh - 64px);
}

.view-sider {
  margin-right: 12px;
  overflow-x: auto;
  resize: horizontal;
  min-width: 200px;
  position: relative;
}

.sider-toggle {
  position: absolute;
  right: 6px;
  top: 0;
}

.view-body {
  flex: 1;
  position: relative;
}

.body-toggle {
  position: absolute;
  left: -6px;
  top: 0;
}
</style>