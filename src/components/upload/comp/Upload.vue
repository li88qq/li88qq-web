<template>
  <div>
    <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :multiple="false"
        @change="handleChange"
        :before-upload="beforeUpload"
        style="height: 620px"
    >
      <img v-if="fileList.length>0" :src="imageUrl" alt="图片" style="max-height: 600px;width: auto;"/>
      <div v-else>
        <p class="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p class="ant-upload-text">选择图片,或拖到图片上传</p>
      </div>
    </a-upload-dragger>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {InboxOutlined} from '@ant-design/icons-vue';
import {getBase64} from '/@/utils/fileUtil'

export default defineComponent({
  name: '',
  props: {},
  components: {InboxOutlined},
  setup() {
    const fileList = ref([]);
    const imageUrl = ref('');

    const handleChange = info => {
      let resFileList = [...info.fileList];
      resFileList = resFileList.slice(-1);
      fileList.value = resFileList;
      getBase64(fileList.value[0].originFileObj, (dataUrl) => {
        imageUrl.value = dataUrl;
      });
    };

    const beforeUpload = (file) => {
      fileList.value = [...fileList.value, file];
      return false;
    };
    return {fileList, imageUrl, handleChange, beforeUpload}
  }
})
</script>

<style scoped>

</style>