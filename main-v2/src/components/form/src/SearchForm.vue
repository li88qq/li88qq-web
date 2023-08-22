<template>
  <a-form layout="inline" :label-col="{span:6}" :wrapper-col="{span:18}">
    <a-row :gutter="[12,12]" ref="rowRef" :class="getClass" class="form-row">
      <template v-for="(item,index) in totalRef" :key="item">
        <a-col v-bind="colRt" v-show="getShow(index)">
          <a-form-item label="字段">
            <a-input/>
          </a-form-item>
        </a-col>
      </template>
      <a-col class="form-action" v-bind="action_colRt">
        <a-form-item>
          <a-space>
            <a-button>清除</a-button>
            <a-button type="primary">查询</a-button>
            <a-button type="link" @click="expandAc">
              <span>展开</span>
              <UpOutlined/>
            </a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
<script setup lang="ts">
import {ref, reactive, watch, computed} from 'vue'
import {UpOutlined} from '@ant-design/icons-vue'
import {useElementSize} from '@vueuse/core'

//组件引用
const rowRef = ref()

//栅格
const colRt = reactive({
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 5,
  xxl: 4
})

//栅格
const action_colRt = reactive({
  xs: {span: 24, offset: 0,},
  sm: {span: 12, offset: 0,},
  md: {span: 8, offset: 0},
  lg: {span: 6, offset: 0},
  xl: {span: 5, offset: 0},
  xxl: {span: 4, offset: 0}
})

//总树
const totalRef = ref(13)

//栅格
const colRef = ref('lg')
//是否展开
const expandRef = ref(false)

//监听宽度变化
const {width} = useElementSize(rowRef)

//计算栅格
watch(() => width.value, value => {
  if (value < 576) {
    colRef.value = 'xs'
  } else if (value < 768) {
    colRef.value = 'sm'
  } else if (value < 992) {
    colRef.value = 'md'
  } else if (value < 1200) {
    colRef.value = 'lg'
  } else if (value < 1600) {
    colRef.value = 'xl'
  } else {
    colRef.value = 'xxl'
  }
})

//计算每行显示数量
const getRowCounts = computed(() => {
  const col = colRef.value
  //注意5
  return Math.ceil(24 / colRt[col])
})

//当前条件是否显示
//条件,展开或索引小于每行显示数
const getShow = computed(() => {
  return (index) => {
    return expandRef.value || index < getRowCounts.value
  }
})

//增加相对当前容器栅格
const getClass = computed(() => {
  return [`row-${colRef.value}`]
})

//展开或折叠
const expandAc = () => {
  expandRef.value = !expandRef.value
}

//计算操作列栅格,右对齐
const getActionCol = computed(() => {
  //栅格
  let span = colRt[colRef.value]
  let offset = 0
  if (!expandRef.value) {
    offset = 24 - span
  } else {
    //注意5
    const rowCount = getRowCounts.value
    if (rowCount === 1) {
      offset = 0
    } else {
      //最后一行余数
      const lastRowCount = totalRef.value % rowCount
      const offsetCount = rowCount - lastRowCount - 1
      offset = offsetCount * span
    }
  }

  return {span, offset}
})

//计算操作按钮偏移
const getActionOffset = (col)=>{
  //栅格
  let span = colRt[col]
  let offset = 0
  if (!expandRef.value) {
    offset = 24 - span
  } else {
    //注意5
    const rowCount = getRowCounts.value
    if (rowCount === 1) {
      offset = 0
    } else {
      //最后一行余数
      const lastRowCount = totalRef.value % rowCount
      const offsetCount = rowCount - lastRowCount - 1
      offset = offsetCount * span
    }
  }
  action_colRt[col].offset = offset
}

//计算操作按钮偏移
watch(()=>colRef.value,value => {
  // getActionOffset(value)
})

</script>
<style scoped>
.form-action {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.form-row {
  width: 100%;
}
</style>