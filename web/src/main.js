import {createApp} from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import {router, setupRouter} from './router'
import {setupStore} from './store'
import {setupRouterGuard} from './router/guard'

const app = createApp(App)
app.config.productionTip = false
app.use(Antd)

setupRouter(app)
setupRouterGuard(router)
setupStore(app)

app.mount('#app')