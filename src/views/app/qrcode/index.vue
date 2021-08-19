<template>
  <a-row>
    <a-col span="12">
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
          <div class="form-action form-right">
            <a-button type="primary" @click="downAc">下载</a-button>
            <a-button type="primary" danger @click="resetAc">清空</a-button>
            <a-button type="primary" @click="createAc">生成</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col span="12">
      <qrCode ref="qrCodeRef" :text="formRt.text" :opt="formRt" style="text-align: center;"></qrCode>
    </a-col>
  </a-row>
</template>

<script>
import {defineComponent, ref, reactive, unref,} from 'vue';
import qrCode from '/@/components/qrCode/index.vue';
import {message} from "ant-design-vue";
import {randomCode} from "/@/utils/fileUtil";

export default defineComponent({
  name: '',
  props: {},
  components: {qrCode},
  setup() {
    const qrCodeRef = ref();
    const formRt = reactive({
      text: '',
      errorCorrectionLevel: 'H',
      size: 200,
      margin: 4,
    });

    const downAc = () => {//下载
      const data = unref(qrCodeRef.value.codeRef);
      if (data) {
        const a = document.createElement('a');
        a.href = data;
        a.download = randomCode(false, 10, 10) + '.png';
        a.click();
      }
    };
    const resetAc = () => {//清空
      formRt.text = '';
      formRt.errorCorrectionLevel = 'H';
      formRt.size = 200;
      formRt.margin = 4;
    };
    const createAc = () => {//生成
      if (formRt.text.trim() === '') {
        message.error('请输入内容');
        return;
      }
      qrCodeRef.value.createAc();
    };
    return {qrCodeRef, formRt, downAc, resetAc, createAc,}
  }
})
</script>

<style scoped>
.form {
  background: #fff;
  border: 1px #eee solid;
  padding: 12px;
}

.form-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>