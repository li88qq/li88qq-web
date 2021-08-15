<template>
  <a-modal
      v-model:visible="visible"
      title="编辑文章"
      @ok="handleOk"
      :width="800"
      destroy-on-close>

    <EditForm ref="formRef" :id="id"></EditForm>
  </a-modal>
</template>
<script>
import {defineComponent, onMounted, ref} from 'vue';
import EditForm from "./EditForm.vue";
import {update} from '/@/api/article/article';

export default defineComponent({
  components: {EditForm},
  emits: ['success'],
  props: {id: {}},
  setup(props, {emit}) {
    const visible = ref(false);
    const formRef = ref();

    const showAc = () => {
      visible.value = true;
    };

    const closeAc = () => {
      visible.value = false;
    };

    const handleOk = async () => {
      try {
        const data = await formRef.value.validate();
        data.id = props.id;
        await update(data);
        emit('success', data);
        visible.value = false;
      } catch (err) {
      }
    };

    return {
      visible,
      formRef,
      showAc,
      closeAc,
      handleOk,
    };
  },
});
</script>