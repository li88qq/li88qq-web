<template>
  <div class="view">
    <div class="login-main">
      <div class="login-form">
        <h3>{{ platRef }}</h3>
        <a-form v-model="formRt" :label-col="{span:8}" :wrapper-col="{span:16}">
          <a-form-item name="mobile" label="手机号码">
            <a-input v-model:value="formRt.mobile"/>
          </a-form-item>
          <a-form-item name="code" label="短信验证码">
            <div class="login-code">
              <a-input v-model:value="formRt.code"/>
              <a-button type="default" @click="querySms">获取验证码</a-button>
            </div>
          </a-form-item>
          <a-form-item :wrapper-col="{span:16,offset:8}">
            <a-button type="primary" block @click="loginAc">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRaw,} from 'vue'
import {getSms, login} from '/@/api/login'
import {useRouter} from "vue-router";
import {useUserStore} from '/@/store/modules/user'

interface FormInfo {
  mobile: string;
  code: string;
}

export default defineComponent({
  name: '',
  props: {},
  components: {},
  emits: [],
  setup() {
    const platRef = ref<string>('欢迎登录')
    const formRt = reactive<FormInfo>({
      mobile: '',
      code: ''
    })

    const {replace} = useRouter()
    const {setToken} = useUserStore()

    const querySms = async () => {
      const smsVo = await getSms(toRaw(formRt))
    }

    const loginAc = async () => {
      const loginVo = await login(toRaw(formRt))
      setToken(loginVo.token)
      await replace('/').catch(err => {
      })
    }

    return {platRef, querySms, formRt, loginAc}
  }
})
</script>
<style lang="less" scoped>
html, body {
  height: 100%;
  width: 100%;
}

.view {
  height: 100vh;
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

.login-form {
  width: 560px;
  border: 1px solid #eee;
  padding: 24px;
}

.login-form h3 {
  text-align: center;
  margin-bottom: 24px;
  color: #000;
  font-weight: bold;
  font-size: 20px;
}

.login-code {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.footer {
  background-color: #eee;
  height: 100px;
}
</style>