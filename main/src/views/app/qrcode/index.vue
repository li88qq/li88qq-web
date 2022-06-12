<template>
  <div class="flex flex-row p-4 space-x-4">
    <a-card size="small" class="flex-1">
      <a-form class="form" :label-col="{span:4}" :wrapper-col="{span:20}">
        <a-form-item label="内容">
          <a-textarea v-model:value="formRt.text" allow-clear/>
        </a-form-item>
        <a-form-item label="容错率">
          <a-select v-model:value="formRt.errorCorrectionLevel">
            <a-select-option value="H">H (30%)</a-select-option>
            <a-select-option value="Q">Q (25%)</a-select-option>
            <a-select-option value="M">M (15%)</a-select-option>
            <a-select-option value="L">L (7%)</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="大小">
          <a-row>
            <a-col :span="20">
              <a-slider v-model:value="formRt.size" :min="50" :max="500"/>
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="formRt.size" :min="50" :max="500" style="margin-left: 16px"/>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="边距">
          <a-row>
            <a-col :span="20">
              <a-slider v-model:value="formRt.margin" :min="1" :max="10"/>
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="formRt.margin" :min="1" :max="10" style="margin-left: 16px"/>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item :wrapper-col="{span:20,offset:4,}">
          <div class="space-x-2 flex flex-row justify-end items-center">
            <a-button type="primary" @click="createAc">
              <template #icon>
                <Icon icon="ant-design:qrcode-outlined" btn></Icon>
              </template>
              生成
            </a-button>
            <a-button type="primary" @click="downAc">
              <template #icon>
                <Icon icon="ant-design:download-outlined" btn></Icon>
              </template>
              下载
            </a-button>
            <a-button type="primary" danger @click="resetAc">
              <template #icon>
                <Icon icon="ant-design:clear-outlined" btn></Icon>
              </template>
              清空
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card size="small" class="flex-1 flex flex-col justify-center items-center">
      <QrCode ref="qrCodeRef" :text="formRt.text" :opt="formRt"></QrCode>
    </a-card>
  </div>
</template>

<script setup>
import {reactive, ref, unref,} from 'vue';
import QrCode from '/@/components/qrcode/index.vue';
import {message} from "ant-design-vue";
import {randomCode} from "/@/utils/fileUtil";
import {Icon} from '/@/components/icon'

const qrCodeRef = ref();
const formRt = reactive({
  text: '',
  errorCorrectionLevel: 'H',
  size: 200,
  margin: 4,
});
//下载
const downAc = () => {
  const data = unref(qrCodeRef.value.codeRef);
  if (data) {
    const a = document.createElement('a');
    a.href = data;
    a.download = randomCode(false, 10, 10) + '.png';
    a.click();
  }
};
//清空
const resetAc = () => {
  formRt.text = '';
  formRt.errorCorrectionLevel = 'H';
  formRt.size = 200;
  formRt.margin = 4;
};
//生成
const createAc = () => {
  if (formRt.text.trim() === '') {
    message.error('请输入内容');
    return;
  }
  qrCodeRef.value.createAc();
};

</script>