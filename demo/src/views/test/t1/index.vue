<template>
  <div>
    <a-card>
      <a-form v-bind="formRt">
        <template v-for="item in formItems" :key="item.name">
          <a-form-item v-bind="item">
            <template v-if="item.component">
              <component :is="item.component" v-bind="item.componentProps"></component>
            </template>
            <template v-else-if="item.customRender">
              <component :is="item.customRender"></component>
            </template>
          </a-form-item>
        </template>
        <a-form-item>
          <a-space>
            <a-button>清除</a-button>
            <a-button type="primary">查询</a-button>
            <a-button type="primary">更多</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card ref="domEl" style="resize: horizontal;width: 400px;min-width: 200px;max-width: 100%;overflow-x: auto;"
            :class="domClass">
      <a-row :gutter="24">
        <template v-for="item in 6" :key="item">
          <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8" :xxl="6" v-focus>
            <a-button type="primary" block>测试2</a-button>
          </a-col>
        </template>
      </a-row>
      <div>{{ width }}</div>
      <div>{{ domClass }}</div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, onMounted, h, computed} from 'vue'
import type {FormProps, FormItemProps} from 'ant-design-vue'
import {Select} from 'ant-design-vue'
import {VNode} from "@vue/runtime-core";
import {useElementBounding, useElementSize} from '@vueuse/core'

const domEl = ref()

const {width} = useElementSize(domEl)


interface FormSchema extends FormItemProps {
  component?: VNode,
  customRender?: VNode,
  componentProps?: Object,
}


const formRt = reactive<FormProps>({
  layout: 'inline',

})

const Punit = h(Select, {
  options: [{value: 1, label: '研发测试'}, {value: 2, label: '停车网关'}],
  style: {width: '200px'}
})

const formItems: FormSchema[] = ([
  {name: 'name', label: '名称', component: 'a-input'},
  {
    name: 'age',
    label: '年龄',
    component: Select,
    componentProps: {options: [{value: 1, label: '男'}, {value: 2, label: '女'}], style: {width: '200px'}}
  },
  {name: 'createDate', label: '创建时间', component: 'a-date-picker'},
  {name: 'punitId', label: '自定义', customRender: Punit,},
]);

const domClass = computed(() => {
  let clazz = []
  const size = width.value
  if (size < 576) {
    clazz.push('xs')
  } else if (size < 768) {
    clazz.push('sm')
  } else if (size < 992) {
    clazz.push('md')
  } else if (size < 1200) {
    clazz.push('lg')
  } else if (size < 1600) {
    clazz.push('xl')
  } else {
    clazz.push('xxl')
  }

  return clazz;
})

const compSpan = computed(()=>{
  const size = domClass.value.join('')
  if(size==='xs'||size==='sm'){
    return 24
  }
  if(size==='md'||size==='lg'){
    return 12;
  }
  if(size==='xl'){
    return 8;
  }
  return 6;
})

const vFocus = {
  mounted: (el,binding,vnode) => {
    const {ctx} = vnode
    console.log(ctx.props)
    console.log(el.parent)
  }
}


</script>