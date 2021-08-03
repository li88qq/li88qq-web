<template>
  <div class="container">
    <a-card>
      <a-row>
        <a-col span="12">
          <a-row>
            <a-col span="8">
              <label>宽:</label>
              <span>{{ imageRt.width }}</span>
            </a-col>
            <a-col span="8">
              <label>高:</label>
              <span>{{ imageRt.height }}</span>
            </a-col>
            <a-col span="8">
              <label>大小:</label>
              <span>{{ imageRt.size }}</span>
              <span>{{ '&nbsp;&nbsp;(' + compSize + ')' }}</span>
            </a-col>
          </a-row>
        </a-col>
        <a-col span="12" class="form-action">
          <a-button type="primary" @click="copyData">复制数据</a-button>
          <a-button type="primary" danger @click="emptyAc">清空</a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-row class="base64">
      <a-col span="12">
        <a-upload-dragger
            name="file"
            :beforeUpload="beforeUpload"
            :show-upload-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="max-width: 100%;height: auto;"/>
          <div v-else>
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p>上传文件</p>
          </div>
        </a-upload-dragger>
      </a-col>
      <a-col span="12">
        <a-textarea v-model:value="imageUrl" class="json-textarea"
                    style="word-break: break-all;height: 100%;padding: 5px;overflow-y: auto;" id="textBox"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {InboxOutlined} from '@ant-design/icons-vue'
import {defineComponent, ref, reactive, unref, computed, toRaw} from 'vue'
import {copyText} from '/@/utils/copyUtil';
import {compBytes} from '/@/utils/unitUtil';

export default defineComponent({
  components: {
    InboxOutlined,
  },

  setup() {
    const imageUrl = ref('')
    const imageRt = reactive({
      width: 0,
      height: 0,
      size: ''
    })

    //自定义上传处理
    const beforeUpload = (file) => {
      imageRt.size = file.size
      getBase64(file).then((data) => {
        imageUrl.value = data
        compImage(data)
      }, (err) => {

      })
      return false
    }
    //取basse64数据
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    //计算图片宽高
    const compImage = (data) => {
      let image = new Image();
      image.onload = () => {
        imageRt.width = image.width
        imageRt.height = image.height
        image = null
      }
      image.src = data
    }

    //清空
    const emptyAc = () => {
      imageUrl.value = ''
    };

    const copyData = () => {
      const text = unref(imageUrl);
      copyText(text)
    };

    const compSize = computed(() => {
      return compBytes(imageRt.size);
    });

    return {
      beforeUpload,
      imageUrl,
      imageRt,
      emptyAc,
      copyData,
      compSize,
    };
  }
})
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.base64 {
  flex: 1;
}
</style>