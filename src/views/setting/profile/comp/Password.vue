<template>
  <div style="padding-top: 20px;">
    <a-form ref="formRef" :model="formRt" :label-col="{span:4}" :wrapper-col="{span:4}" :rules="rules">
      <a-form-item label="旧密码" name="oldPassword">
        <a-input-password v-model:value="formRt.oldPassword" allow-clear/>
      </a-form-item>
      <a-form-item label="新密码" name="password">
        <a-input-password v-model:value="formRt.password" allow-clear/>
      </a-form-item>
      <a-form-item label="确认新密码" name="repeatPassword">
        <a-input-password v-model:value="formRt.repeatPassword" allow-clear/>
      </a-form-item>
      <a-form-item :wrapper-col="{span:4,offset:4,}">
        <a-button type="default" @click="resetAc" style="margin-right: 10px;">重置</a-button>
        <a-button type="primary" @click="saveAc">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, toRaw} from 'vue';
import {updatePassword} from '/@/api/my/index'

export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup() {
    const formRef = ref();
    const formRt = reactive({
      oldPassword: '',
      password: '',
      repeatPassword: ''
    });
    const checkRepeatPassword = async (rule, value) => {
      if (!value) {
        return Promise.reject('请输入确认新密码')
      }
      const length = value.length;
      if (length < 6 || length > 12) {
        return Promise.reject('密码长度(6-12)位字符')
      }
      if (value !== formRt.password) {
        return Promise.reject('确认新密码和新密码不一致')
      }
      return Promise.resolve();
    };
    const rules = {
      oldPassword: [
        {required: true, message: '请输入旧密码', trigger: 'blur'},
        {min: 6, max: 12, message: '密码长度(6-12)位字符', trigger: 'blur'},
      ],
      password: [
        {required: true, message: '请输入新密码', trigger: 'blur'},
        {min: 6, max: 12, message: '密码长度(6-12)位字符', trigger: 'blur'},
      ],
      repeatPassword: [
        {required: true, validator: checkRepeatPassword, trigger: 'blur'},
      ],
    };
    const saveAc = async () => {
      try {
        const data = await formRef.value.validate();
        await updatePassword(data);
      } catch (err) {

      }
    };
    const resetAc = async () => {
      await formRef.value.resetFields();
    }
    return {formRef, formRt, rules, saveAc, resetAc}
  }
})
</script>

<style scoped>

</style>