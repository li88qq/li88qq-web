<template>
  <a-modal
      :visible="visibleRef"
      title="编辑导航分类"
      @ok="saveAc"
      @cancel="closeAc"
      closable
  >
    <a-form ref="formRef" :model="formRt" :rules="rules">
      <a-form-item label="名称" name="name">
        <a-input v-model:value="formRt.name" allow-clear :maxlength="20"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {defineComponent, reactive, ref, toRaw,} from 'vue';
import {updateType} from '/@/api/nav';

export default defineComponent({
  name: '',
  props: {},
  components: {},
  emits: ['success'],
  setup(props, {emit}) {
    const formRef = ref();
    const visibleRef = ref(false);
    const formRt = reactive({
      id: 0,
      name: '',
    });
    const showAc = (type) => {
      formRt.id = type.typeId;
      formRt.name = type.typeName
      visibleRef.value = true;
    };
    const closeAc = () => {
      visibleRef.value = false;
    };
    const saveAc = async () => {
      try {
        await formRef.value.validate();
        await updateType(toRaw(formRt));
        closeAc();
        emit('success');
      } catch (err) {
      }
    };
    const rules = {
      name: [
        {required: true, message: '请输入名称', trigger: 'blur'},
        {min: 2, max: 20, message: '名称长度2-20个字符', trigger: 'blur'},]
    }
    return {formRef, formRt, visibleRef, rules, showAc, closeAc, saveAc,}
  }
})
</script>

<style scoped>

</style>