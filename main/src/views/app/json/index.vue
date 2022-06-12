<template>
  <div class="flex flex-col p-4 h-full overflow-hidden">
    <a-card size="small">
      <div class="flex flex-row justify-between w-full">
        <div class="flex-1">
          <p class="text-red-500">{{ msgRef }}</p>
        </div>
        <div class="flex-1 flex flex-row space-x-2 pl-4">
          <a-button type="primary" @click="changeShowType(false)">
            <template #icon>
              <Icon icon="ant-design:check-circle-outlined" btn></Icon>
            </template>
            格式化
          </a-button>
          <a-button type="primary" @click="changeShowType(true)">
            <template #icon>
              <Icon icon="ant-design:minus-square-outlined" btn></Icon>
            </template>
            压缩
          </a-button>
          <a-button type="primary" @click="copyToClip">
            <template #icon>
              <Icon icon="ant-design:copy-outlined" btn></Icon>
            </template>
            复制
          </a-button>
          <a-button type="primary" @click="emptyAc" danger>
            <template #icon>
              <Icon icon="ant-design:clear-outlined" btn></Icon>
            </template>
            清空
          </a-button>
        </div>
      </div>
    </a-card>
    <div class="flex-1 flex flex-row mt-4 space-x-4 overflow-auto">
      <a-card size="small" class="flex-1 overflow-auto" :bodyStyle="jsonBodyRt">
        <a-textarea v-model:value="jsonRt.json" class="flex-1" @change="toJson"/>
      </a-card>
      <a-card size="small" class="flex-1 overflow-auto" :bodyStyle="jsonBodyRt">
        <a-textarea v-model:value="jsonRt.text" class="flex-1" v-show="showJson"
                    style="word-break: break-all;"/>
        <MyJson :data="jsonRt.html" v-show="!showJson" class="flex-1 p-0"></MyJson>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, toRaw,} from 'vue'
import MyJson from '/@/components/json/MyJson.vue'
import {message} from 'ant-design-vue'
import {buildArr, buildObject, getType} from '/@/utils/jsonUtil'
import {copyText} from '/@/utils/copyUtil';
import {Icon} from '/@/components/icon'

const jsonRt = reactive({
  json: '',
  html: '',
  text: ''
})
const msgRef = ref('')
const showJson = ref(false)

const changeShowType = (show) => {
  showJson.value = show
}
//textarea样式
const jsonBodyRt = reactive({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

//转换json
const toJson = () => {
  let _json = jsonRt.json.trim()
  if (_json === '') {
    return
  }
  let obj
  try {
    obj = JSON.parse(_json)
    msgRef.value = ''
  } catch (e) {
    msgRef.value = e
    return
  }
  jsonRt.text = JSON.stringify(obj)
  jsonFormat()
}

//格式化json
const jsonFormat = () => {
  let json = JSON.parse(jsonRt.json)
  if (json === null || json === '') {
    return
  }
  let type = getType(json)
  let obj
  if (type === 'object') {
    obj = buildObject('', '', '', json, '')
  } else {
    obj = buildArr('', '', '', json, '')
  }
  jsonRt.html = obj
}

// 复制数据到粘贴板
const copyToClip = () => {
  const text = toRaw(jsonRt).text
  if (text === '') {
    message.warning('数据为空')
    return
  }
  showJson.value = true
  copyText(text)
}
//清空
const emptyAc = () => {
  jsonRt.json = ''
  jsonRt.text = ''
  jsonRt.html = ''
}
</script>