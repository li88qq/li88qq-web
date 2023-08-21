<template>
  <a-form layout="inline" :label-col="{span:6}" :wrapper-col="{span:18}">
    <a-row :gutter="[12,12]" v-row>
      <template v-for="(item,index) in 12" :key="item">
        <a-col v-bind="colRt">
          <a-form-item label="字段">
            <a-input/>
          </a-form-item>
        </a-col>
      </template>
      <a-col v-bind="colRt" class="form-action">
        <a-form-item>
          <a-space>
            <a-button>清除</a-button>
            <a-button type="primary">查询</a-button>
            <a-button type="link">
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

//栅格
const colRt = reactive({
  xs:24,
  sm:12,
  md:8,
  lg:6,
  xl:5,
  xxl:4
})


</script>
<style scoped>
.form-action{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
</style>