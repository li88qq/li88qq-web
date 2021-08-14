<template>
  <a-modal
      :visible="visible"
      title="上传文件"
      ok-text="上传"
      cancel-text="取消"
      closable
      :width="1200"
      @ok="okAc"
      @cancel="closeAc"
      :confirm-loading="loadingRef"
      destroy-on-close
  >
    <Upload ref="uploadRef"></Upload>
  </a-modal>
</template>

<script>
import {defineComponent, ref, toRaw} from 'vue';
import Upload from "./comp/Upload.vue";
import {message} from "ant-design-vue";
import {saveImage} from '/@/api/file/index'

export default defineComponent({
  name: '',
  props: {},
  emits: ['success'],
  components: {Upload},
  setup(props, {emit}) {
    const visible = ref(false);
    const uploadRef = ref();
    const loadingRef = ref(false);
    const showAc = () => {
      visible.value = true;
    };
    const closeAc = () => {
      visible.value = false;
    };
    const okAc = async () => {
      const files = toRaw(uploadRef.value.fileList);
      if (!files || files.length === 0) {
        message.error('请选择文件');
        return;
      }

      const data = {
        tag: 'article',
        file: files[0].originFileObj
      }
      loadingRef.value = false;
      try {
        const url = await saveImage(data);
        emit('success', url);
        closeAc();
      } catch (err) {

      } finally {
        loadingRef.value = false;
      }
    };
    return {visible, uploadRef, loadingRef, showAc, closeAc, okAc,}
  }
})
</script>

<style scoped>

</style>