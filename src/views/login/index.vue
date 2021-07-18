<template>
  <div class="container">
    <a-card title="欢迎登录li88qq平台" class="login-form">
      <a-form :model="formRt" :label-col="{span:4}" :wrapper-col="{span:16}">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="formRt.username"/>
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formRt.password"/>
        </a-form-item>
        <a-form-item label="验证码" name="code">
          <div style="display: flex;flex-direction: row;">
            <a-input v-model:value="formRt.code" style="flex:1;"/>
            <img :src="codeRef" @click="changeAc" style="width: 160px;"/>
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{span:16,offset:4}">
          <a-button type="primary" block @click="loginAc">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRaw, onMounted} from 'vue';
import {login} from '/@/api/login'
import {getCaptcha} from '/@/api/p'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup() {
    const formRt = reactive({
      username: '',
      password: '',
      code: ''
    })

    const codeRef = ref('')
    const {replace} = useRouter();

    const loginAc = async () => {
      try {
        await login(toRaw(formRt))
        replace('/home').catch((()=>{}))
      } catch (err) {

      }
    }
    const changeAc = () => {
      queryCode()
    }

    const queryCode = async () => {
      const blob = await getCaptcha();
      codeRef.value = URL.createObjectURL(blob);
    }

    onMounted(() => {
      queryCode()
    })
    return {formRt, codeRef, loginAc, changeAc}
  }
})
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 600px;
}
</style>