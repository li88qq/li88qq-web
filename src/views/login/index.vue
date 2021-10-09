<template>
  <div class="container">
    <div class="login-container">
      <a-card :title="'欢迎登录'+envRt.name+'平台'" class="login-form">
        <template #extra>
          <a-button type="link" v-show="formRt.type===0" @click="changeTypeAc(1)">手机登录</a-button>
          <a-button type="link" v-show="formRt.type===1" @click="changeTypeAc(0)">账号登录</a-button>
        </template>
        <a-form ref="formRef" :model="formRt" :label-col="{span:4}" :wrapper-col="{span:16}" :rules="rules">
          <div v-show="formRt.type===0">
            <a-form-item label="用户名" name="username">
              <a-input v-model:value="formRt.username" :maxlength="12" allow-clear/>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input-password v-model:value="formRt.password" :maxlength="12" allow-clear/>
            </a-form-item>
            <a-form-item label="验证码" name="code">
              <div style="display: flex;flex-direction: row;">
                <a-input v-model:value="formRt.code" style="flex:1;" @keyup.enter="loginAc" :maxlength="4" allow-clear/>
                <img :src="codeRef" @click="changeAc" style="width: 120px;height: 32px;"/>
              </div>
            </a-form-item>
          </div>
          <div v-show="formRt.type===1">
            <a-form-item label="手机号码" name="mobile">
              <a-input v-model:value="formRt.mobile" :maxlength="11" allow-clear/>
            </a-form-item>
            <a-form-item label="验证码" name="smsCode">
              <div style="display: flex;flex-direction: row;justify-content: space-between;">
                <a-input v-model:value="formRt.smsCode" :maxlength="6" allow-clear/>
                <a-button type="link">获取短信验证码</a-button>
              </div>
            </a-form-item>
          </div>
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
import {login, loginMobile} from '/@/api/login'
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
      code: '',
      mobile: '12345678901',
      smsCode: '123456',
      type: 1,
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
        if (formRt.type === 1) {
          await loginMobile(data)
        } else if (formRt.type === 0) {
          await login(data)
        }

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
    };

    //校验用户名
    const validateUsername = async (rule, value) => {
      if (formRt.type === 1) {
        return Promise.resolve();
      }
      if (value === '') {
        return Promise.reject('请输入用户名');
      }
      if (value.length < 2 || value.length > 12) {
        return Promise.reject('用户名2-12个字符');
      }
      return Promise.resolve();
    };

    //校验密码
    const validatePassword = async (rule, value) => {
      if (formRt.type === 1) {
        return Promise.resolve();
      }
      if (value === '') {
        return Promise.reject('请输入密码');
      }
      if (value.length < 6 || value.length > 12) {
        return Promise.reject('密码6-12个字符');
      }
      return Promise.resolve();
    };

    //校验验证码
    const validateCode = async (rule, value) => {
      if (formRt.type === 1) {
        return Promise.resolve();
      }
      if (value === '') {
        return Promise.reject('请输入验证码');
      }
      const reg = /^[0-9A-Za-z]{4}$/;
      if (!reg.test(value)) {
        return Promise.reject('验证码4个字符(数字和字母)');
      }
      return Promise.resolve();
    };

    //校验手机号码
    const validateMobile = async (rule, value) => {
      if (formRt.type === 0) {
        return Promise.resolve();
      }
      if (value === '') {
        return Promise.reject('请输入手机号码');
      }
      const reg = /^1[0-9]{10}$/;
      if (!reg.test(value)) {
        return Promise.reject('手机号码11个数字');
      }
      return Promise.resolve();
    };

    //校验短信验证码
    const validateSmsCode = async (rule, value) => {
      if (formRt.type === 0) {
        return Promise.resolve();
      }
      if (value === '') {
        return Promise.reject('请输入短信验证码');
      }
      const reg = /^[0-9]{6}$/;
      if (!reg.test(value)) {
        return Promise.reject('短信验证码6个数字');
      }
      return Promise.resolve();
    };

    const rules = {
      username: [
        {required: true, validator: validateUsername, trigger: 'blur'},
      ],
      password: [
        {required: true, validator: validatePassword, trigger: 'blur'},
      ],
      code: [
        {required: true, validator: validateCode, trigger: 'blur'},
      ],
      mobile: [
        {required: true, validator: validateMobile, trigger: 'blur'},
      ],
      smsCode: [
        {required: true, validator: validateSmsCode, trigger: 'blur'},
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
    };

    const changeTypeAc = (type) => {
      formRt.type = type;
    };

    onMounted(() => {
      init()
      queryCode()
    })
    return {formRef, formRt, codeRef, envRt, rules, loginAc, changeAc, changeTypeAc,}
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