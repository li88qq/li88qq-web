<template>
  <div class="main">
    <a-card>
      <a-row>
        <a-col span="12">
          <span class="red">{{ msgRef }}</span>
        </a-col>
        <a-col span="12" class="form-action">
          <a-button type="primary" @click="changeShowType(false)">格式化</a-button>
          <a-button type="primary" @click="changeShowType(true)">压缩</a-button>
          <a-button type="primary" danger @click="emptyAc">清空</a-button>
          <a-button type="primary" @click="copyToClip">复制到剪切板</a-button>
        </a-col>
      </a-row>
    </a-card>
    <div class="json-container">
      <div class="json-input">
        <a-textarea v-model:value="jsonRt.json" class="json-textarea" @change="toJson"/>
      </div>

      <div class="json-output">
        <a-textarea v-model:value="jsonRt.text" class="json-textarea" v-show="showJson"
                    style="word-break: break-all;" id="textBox"/>
        <MyJson :data="jsonRt.html" v-show="!showJson"></MyJson>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue'
import MyJson from '/@/components/json/index.vue'
import {message} from 'ant-design-vue'
import {buildObject,buildArr,getType} from '/@/utils/jsonUtil'

export default defineComponent({
  name: 'Json',
  components: {MyJson},
  setup() {
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
      if (jsonRt.text === '') {
        message.warning('数据为空')
        return
      }
      showJson.value = true
      const inputDiv = document.getElementById('textBox');
      inputDiv.select()
      document.execCommand('copy')
      message.success('数据已复制到粘贴板')
    }

    const emptyAc = () => {
      jsonRt.json = ''
      jsonRt.text = ''
      jsonRt.html = ''
    }

    return {jsonRt, msgRef, toJson, showJson, changeShowType, copyToClip, emptyAc}
  }
})
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.json-container {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.json-input {
  flex: 1;
}

.json-output {
  flex: 1;
  background-color: #fff;
}

.json-textarea {
  height: 100%;
}

.red {
  color: red;
}
</style>