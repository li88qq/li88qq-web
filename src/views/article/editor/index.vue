<template>
  <div class="editor-container">
    <div class="editor-action">
      <a-button type="primary" @click="saveAc">保存</a-button>
      <a-button type="primary" @click="uploadAc">上传图片</a-button>
      <a-button type="primary" danger @click="resetAc">清空</a-button>
      <a-button type="primary">模板</a-button>
      <a-button type="primary" @click="helpAc">帮助</a-button>
    </div>
    <div id="editor" class="editor"></div>
    <AddModal ref="addModalRef" @success="handleSuccess"></AddModal>
    <UploadModal ref="uploadRef" @success="handleFile"></UploadModal>
  </div>
</template>

<script>
import {defineComponent, ref, defineAsyncComponent, onMounted} from 'vue';
import Vditor from 'vditor';
import "vditor/dist/index.css";
import {save} from '/@/api/article/article';

export default defineComponent({
  name: '',
  props: {},
  components: {
    Vditor,
    AddModal: defineAsyncComponent(() =>
        import('/@/views/article/my/comp/AddModal.vue')
    ),
    UploadModal: defineAsyncComponent(() =>
        import('/@/components/upload/index.vue')
    ),
  },
  setup() {
    let vditor = null;
    const addModalRef = ref();
    const uploadRef = ref();

    const initEditor = () => {
      vditor = new Vditor('editor', {
        mode: 'sv',
      })
    }

    //打开新增对话框
    const saveAc = () => {
      addModalRef.value.showAc();
    }

    //保存文章
    const handleSuccess = async (data) => {
      try {
        const content = vditor.getValue();
        data.content = content;
        await save(data)
        resetAc();
      } catch (err) {
      }
    };

    //重置编辑器内容
    const resetAc = () => {
      //重置内容,并清除缓存内容
      vditor.setValue("", true);//设置编辑器内容且选中清空历史栈
      vditor.clearStack();//清空撤销和重做记录栈
      vditor.clearCache();//清除缓存
    }

    //跳转编辑器文档
    const helpAc = () => {
      window.open('https://github.com/Vanessa219/vditor', '_blank');
    }

    onMounted(() => {
      initEditor();
    })

    //上传图片
    const uploadAc = () => {
      uploadRef.value.showAc();
    }

    //上传图片插入到编辑器光标处
    const handleFile = (url) => {
      const image = '![图片](' + url + ')';
      vditor.insertValue(image);
    };

    return {addModalRef, uploadRef, saveAc, resetAc, helpAc, handleSuccess, handleFile, uploadAc}
  }
})
</script>

<style scoped>
.editor-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.editor-action {
  background-color: #fff;
  padding: 12px;
}

.editor-action button {
  margin-right: 10px;
}

.editor {
  flex: 1;
  overflow: auto;
}
</style>