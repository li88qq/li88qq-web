<template>
  <a-modal
      v-model:visible="visible"
      title="新增文章"
      @ok="handleOk"
      :width="800"
      destroy-on-close>

    <AddForm ref="formRef"></AddForm>
  </a-modal>
</template>
<script>
import {defineComponent, ref} from 'vue';
import AddForm from "./AddForm.vue";

export default defineComponent({
  components: {AddForm},
  emits: ['success'],
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