<template>
  <div class="login-view">
    <div class="login-main">
      <div class="login-welcome">{{ VITE_APP_WELCOME }}</div>
      <div class="login-form">
        <a-form :model="formRt" :label-col="{span:6}" :wrapper-col="{span:18}">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="formRt.username" allow-clear :maxlength="32"/>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password v-model:value="formRt.password" :maxlength="32"/>
          </a-form-item>
          <a-form-item label="验证码" name="code">
            <div class="login-form-captcha">
              <a-input v-model:value="formRt.code" allow-clear :maxlength="4"/>
              <img :src="captchaRef" @click="queryCaptcha"/>
            </div>
          </a-form-item>
          <a-form-item :wrapper-col="{offset:6}">
            <a-button type="primary" block @click="loginAc">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="login-footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onMounted, toRaw,} from 'vue'
import Footer from '/@/layouts/default/footer/index.vue'
import {getCaptcha, login} from '/@/api/login'
import {useUserStore} from '/@/store'
import {router} from '/@/router'

const {VITE_APP_WELCOME} = import.meta.env
const userStore = useUserStore()

const captchaRef = ref('')

const formRt = reactive({
  username: '',
  password: '',
  code: '',
  checkCode: '',
})

const queryCaptcha = async () => {
  const data = await getCaptcha()
  captchaRef.value = data.captcha
  formRt.checkCode = data.code
}

const loginAc = async () => {
  const data = await login(toRaw(formRt))
  userStore.login(data.token)
  await router.replace('/')
}

onMounted(() => {
  queryCaptcha()
})

</script>
<style scoped lang="less">
.login-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.login-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-welcome {
  padding: 24px;
  font-size: 18px;
  font-weight: bold;
}

.login-form {
  padding: 24px;
  width: 400px;
  box-shadow: 0 4px 8px #ccc;
  z-index: 10;
}

.login-form-captcha {
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    height: 32px;
  }

}

</style>