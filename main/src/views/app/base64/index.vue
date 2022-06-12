<template>
  <div class="flex flex-col p-4 overflow-auto h-full">
    <a-card size="small">
      <div class="flex flex-row">
        <div class="flex-1 flex flex-row justify-between items-center">
          <div class="flex-1">
            <label>宽</label>
            <span>{{ imageRt.width }}</span>
          </div>
          <div class="flex-1">
            <label>高</label>
            <span>{{ imageRt.height }}</span>
          </div>
          <div class="flex-1">
            <label>大小</label>
            <span>{{ imageRt.size }}</span>
            <span>{{ '&nbsp;&nbsp;(' + compSize + ')' }}</span>
          </div>
        </div>
        <div class="flex-1 space-x-2">
          <a-button type="primary" @click="copyData">
            <template #icon>
              <Icon icon="ant-design:copy-outlined" btn></Icon>
            </template>
            复制数据
          </a-button>
          <a-button type="primary" danger @click="emptyAc">
            <template #icon>
              <Icon icon="ant-design:clear-outlined" btn></Icon>
            </template>
            清空
          </a-button>
        </div>
      </div>
    </a-card>
    <div class="flex-1 flex flex-row mt-4 space-x-4 overflow-auto">
      <a-card size="small" class="flex-1 overflow-auto" :bodyStyle="cardBodyRt">
        <div class="flex-1 flex flex-col overflow-auto">
          <div>
            <a-upload-dragger
                name="file"
                :beforeUpload="beforeUpload"
                :show-upload-list="false"
            >
              <a-button type="primary">
                <template #icon>
                  <Icon icon="ant-design:upload-outlined" btn></Icon>
                </template>
                上传图片
              </a-button>
            </a-upload-dragger>
          </div>
          <div class="flex-1 overflow-hidden text-center mt-4">
            <a-image v-if="imageUrl" :src="imageUrl" alt="图片" :width="compBox.width" :height="compBox.height"
                     :class="compBox.class"/>
          </div>
        </div>
      </a-card>
      <a-card size="small" class="flex-1 flex flex-col overflow-auto" :bodyStyle="cardBodyRt">
        <div class="flex-1">
          <a-textarea v-model:value="imageUrl" class="json-textarea"
                      style="word-break: break-all;height: 100%;padding: 5px;overflow-y: auto;" id="textBox"/>
        </div>
      </a-card>
    </div>

  </div>
</template>
<script setup>
import {computed, reactive, ref, toRaw, unref} from 'vue'
import {copyText} from '/@/utils/copyUtil';
import {compBytes} from '/@/utils/unitUtil';
import {Icon} from '/@/components/icon'

const imageUrl = ref('')
const imageRt = reactive({
  width: 0,
  height: 0,
  size: ''
})

const compBox = computed(() => {
  const boxObj = {
    width: '',
    height: '',
    class: '',
  }
  if (imageRt.height > imageRt.width) {
    boxObj.height = '100%'
    boxObj.width='auto'
    boxObj.class='max-h-full'
  }
  return boxObj
})

//cardBody样式
const cardBodyRt = reactive({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
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

</script>