<template>
  <a-card class="m-4">
    <div class="row">
      <label class="row-label">单位：</label>
      <a-radio-group v-model:value="formRt.unit">
        <a-radio :value="1">秒</a-radio>
        <a-radio :value="2">毫秒</a-radio>
      </a-radio-group>
    </div>
    <div class="row">
      <div class="row-item">
        <label class="row-label">当前时间：</label>
        <span>{{ formRt.datetime }}</span>
      </div>
      <div class="row-item">
        <label class="row-label">时间戳：</label>
        <span>{{ formRt.timestamp }}</span>
      </div>
      <a-button type="primary" @click="copyTimestamp">
        <template #icon>
          <Icon icon="ant-design:copy-outlined" btn></Icon>
        </template>
        复制
      </a-button>
    </div>

    <div class="row">
      <div class="row-item">
        <label class="row-label">时间：</label>
        <a-date-picker :showTime="true" v-model:value="formRt.datetime1"/>
      </div>
      <div class="row-item">
        <label class="row-label">时间戳：</label>
        <div>
          <a-input v-model:value="formRt.timestamp1" disabled/>
        </div>
      </div>
      <a-button type="primary" @click="copyTimestamp1">
        <template #icon>
          <Icon icon="ant-design:copy-outlined" btn></Icon>
        </template>
        复制
      </a-button>
    </div>

    <div class="row">
      <div class="row-item">
        <label class="row-label">时间戳：</label>
        <div>
          <a-input v-model:value="formRt.timestamp2"/>
        </div>
      </div>
      <div class="row-item">
        <label class="row-label">时间：</label>
        <a-date-picker :value="compDatetime" :showTime="true" disabled/>
      </div>
      <a-button type="primary" danger @click="emptyAc">
        <template #icon>
          <Icon icon="ant-design:clear-outlined" btn></Icon>
        </template>
        清空
      </a-button>
    </div>
  </a-card>
</template>
<script setup>
import {computed, reactive, toRaw, watchEffect, onMounted} from 'vue';
import {objFormat, objNow, objToMs, objToSecond, msToObj, timestampToObj} from '/@/utils/dateUtil';
import {copyText} from '/@/utils/copyUtil';
import {Icon} from '/@/components/icon'

const formRt = reactive({
  ip: '',
  datetime: undefined,
  timestamp: undefined,
  unit: 1,
  datetime1: undefined,
  timestamp1: undefined,
  timestamp2: undefined,
});

watchEffect(() => {
  if (formRt.unit === 1) {
    formRt.timestamp1 = objToSecond(formRt.datetime1);
  } else {
    formRt.timestamp1 = objToMs(formRt.datetime1);
  }
});

//转换时间
const compDatetime = computed(() => {
  if (formRt.unit === 1) {
    return timestampToObj(formRt.timestamp2);
  } else {
    return msToObj(formRt.timestamp2);
  }
});

//获取当前时间
const initTime = () => {
  const obj = objNow();
  formRt.datetime = objFormat(obj);
  if (formRt.unit === 1) {
    formRt.timestamp = objToSecond(obj);
  } else {
    formRt.timestamp = objToMs(obj);
  }
}

//复制当前时间戳
const copyTimestamp = () => {
  const text = toRaw(formRt).timestamp;
  copyText(text);
};

//复制指定日期时间戳
const copyTimestamp1 = () => {
  const text = toRaw(formRt).timestamp1;
  copyText(text);
};

//清空时间戳
const emptyAc = () => {
  formRt.timestamp2 = undefined;
};
onMounted(() => {
  initTime();
  //定时刷新时间
  setInterval(() => {
    initTime();
  }, 1000)
})
</script>
<style scoped lang="less">
.row {
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
}

.row-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 360px;
}

.row-label {
  display: inline-block;
  width: 80px;
}
</style>