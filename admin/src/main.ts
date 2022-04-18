import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import '/@/design/public.less'

import {router} from "/@/router";
import {setupStore} from '/@/store'
import {setupRouterGuard} from '/@/router/guard'

const app = createApp(App)
setupStore(app)
setupRouterGuard(router)
app.use(router)
app.use(Antd)

app.mount('#app')