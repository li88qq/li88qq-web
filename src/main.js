import {createApp} from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '/@/design/index.css'
import {setupStore} from "./store";

import router from "./router";

const app = createApp(App)
app.use(router)
app.use(Antd)
setupStore(app)
app.mount('#app')

