<template>
  <div class="container">
    <div class="login-container">
      <a-card :title="'欢迎登录'+envRt.name+'平台'" class="login-form">
        <a-form ref="formRef" :model="formRt" :label-col="{span:4}" :wrapper-col="{span:16}" :rules="rules">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="formRt.username" :maxlength="20" allow-clear/>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="formRt.password" :maxlength="20" allow-clear/>
          </a-form-item>
          <a-form-item label="验证码" name="code">
            <div style="display: flex;flex-direction: row;">
              <a-input v-model:value="formRt.code" style="flex:1;" @keyup.enter="loginAc" :maxlength="4" allow-clear/>
              <img :src="codeRef" @click="changeAc" style="width: 120px;height: 32px;"/>
            </div>
          </a-form-item>
          <a-form-item :wrapper-col="{span:16,offset:4}">
            <a-button type="primary" block @click="loginAc">登录</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
    <div class="footer">
      <div class="footer-header">
        <a target="_blank" :href="envRt.url" class="footer-header-a">
          <img src="/beian.png">
          <p>{{ envRt.url1 }}</p>
        </a>
        <a href="https://beian.miit.gov.cn/" target="_blank">
          <p>{{ envRt.url2 }}</p>
        </a>
      </div>
      <div><p>{{ envRt.copyRight }}</p></div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, toRaw, onMounted} from 'vue';
import {login} from '/@/api/login'
import {getCaptcha} from '/@/api/p'
import {useRouter} from 'vue-router'
import {loginStore} from "/@/store";

export default defineComponent({
  name: '',
  props: {},
  components: {},
  setup() {
    const formRef = ref()
    const formRt = reactive({
      username: 'test',
      password: '123456',
      code: ''
    })
    const envRt = reactive({
      url: '',
      url1: '',
      url2: '',
      name: '',
      copyRight: '',
    })

    const codeRef = ref('')
    const {replace} = useRouter();

    const loginAc = async () => {
      try {
        const data = await formRef.value.validate();
        await login(data)
        loginStore.commit('login')
        replace('/my/view').catch(() => {
        })
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

    const rules = {
      username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 2, max: 12, message: '用户名2-12个字符', trigger: 'blur'},
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 12, message: '密码6-12个字符', trigger: 'blur'},
      ],
      code: [
        {required: true, message: '请输入验证码', trigger: 'blur'},
        {min: 4, max: 4, message: '验证码4个字符', trigger: 'blur'},
      ],
    }

    const init = () => {
      const {
        VITE_APP_BENAN_URL,
        VITE_APP_BENAN_1,
        VITE_APP_BENAN_2,
        VITE_APP_NAME,
        VITE_APP_COPYRIGHT
      } = import.meta.env
      envRt.url = VITE_APP_BENAN_URL
      envRt.url1 = VITE_APP_BENAN_1
      envRt.url2 = VITE_APP_BENAN_2
      envRt.name = VITE_APP_NAME
      envRt.copyRight = VITE_APP_COPYRIGHT
    }

    onMounted(() => {
      init()
      queryCode()
    })
    return {formRef, formRt, codeRef, envRt, rules, loginAc, changeAc}
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

.login-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-form {
  width: 600px;
}

.footer {
  background-color: #2e3033;
  width: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer p {
  margin: 0;
  color: #fff;
}

.footer-header {
  display: flex;
  flex-direction: row;
}

.footer-header-a {
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-right: 10px;
}
</style>