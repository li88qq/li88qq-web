<template>
  <div style="padding-top: 20px;">
    <a-form :label-col="{span:4}" :wrapper-col="{span:8}">
      <a-form-item label="用户名">
        {{ formRt.username }}
      </a-form-item>
      <a-form-item label="昵称">
        <a-input v-model:value="formRt.nickname" allow-clear/>
      </a-form-item>
      <a-form-item label="手机号码">
        <a-input v-model:value="formRt.mobile" allow-clear/>
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="formRt.email" allow-clear/>
      </a-form-item>
      <a-form-item label="注册时间">
        {{ timestampToTime(formRt.createDate) }}
      </a-form-item>
      <a-form-item label="最近登录时间">
        {{ timestampToTime(formRt.lastLoginDate) }}
      </a-form-item>
      <a-form-item label="最近登录IP">
        {{ formRt.lastLoginIp }}
      </a-form-item>
      <a-form-item :wrapper-col="{span:12,offset:4,}">
        <a-button type="default" @click="resetAc" style="margin-right: 10px;">重置</a-button>
        <a-button type="primary" @click="saveAc">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {defineComponent, reactive, onMounted} from 'vue';
import {profile, updateProfile} from '/@/api/my/index';
import {timestampToTime} from '/@/utils/dateUtil'

export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup() {
    const formRt = reactive({
      username: '',
      nickname: '',
      email: '',
      mobile: '',
      photo: '',
      createDate: '',
      lastLoginDate: '',
      lastLoginIp: '',
    });
    const formBakRef = reactive({
      nickname: '',
      email: '',
      mobile: '',
    });
    const query = async () => {
      const data = await profile();
      for (let k in formRt) {
        formRt[k] = data[k]
      }
      for (let k in formBakRef) {
        formBakRef[k] = data[k]
      }
    };
    const saveAc = async () => {
      const data = {
        nickname: formRt.nickname,
        mobile: formRt.mobile,
        email: formRt.email,
      }
      await updateProfile(data).catch(() => {
      })
    };
    const resetAc = () => {
      formRt.nickname = formBakRef.nickname;
      formRt.mobile = formBakRef.mobile;
      formRt.email = formBakRef.email;
    };
    onMounted(() => {
      query();
    });
    return {formRt, timestampToTime, saveAc, resetAc}
  }
})
</script>

<style scoped>

</style>