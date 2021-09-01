<template>
  <a-form ref="formRef" :model="formRt" :label-col="{span:6}" :wrapper-col="{span:18}" :rules="rules">
    <a-form-item name="title" label="标题">
      <a-input v-model:value="formRt.title" :maxlength="50" allow-clear/>
    </a-form-item>
    <a-form-item name="original" label="是否原创">
      <a-radio-group v-model:value="formRt.original">
        <a-radio :value="1">原创</a-radio>
        <a-radio :value="2">转载</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item name="quote" label="引用地址">
      <a-input v-model:value="formRt.quote" :maxlength="255" allow-clear/>
    </a-form-item>
    <a-form-item name="open" label="是否公开">
      <a-radio-group v-model:value="formRt.open">
        <a-radio :value="1">公开</a-radio>
        <a-radio :value="2">不公开</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item name="labels" label="标签">
      <a-input v-model:value="formRt.labels" :maxlength="100" allow-clear/>
    </a-form-item>
  </a-form>
</template>
<script>
import {defineComponent, reactive, ref} from 'vue';

export default defineComponent({
  setup() {
    const formRef = ref();
    const formRt = reactive({
      title: '',
      original: 1,
      quote: '',
      open: 1,
      labels: '',
    })

    const rules = {
      title: [
        {required: true, message: '请输入标题', trigger: 'blur'},
        {min: 2, max: 50, message: '标题长度(2-50)', trigger: 'blur'},
      ],
    };

    const validate = async () => {
      const data = await formRef.value.validate();
      return data;
    };

    return {
      formRef,
      formRt,
      rules,
      validate,
    };
  },
});
</script>