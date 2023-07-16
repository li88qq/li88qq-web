import {createApp} from 'vue'
import App from './App.vue'

import router from './router'
import {setupStore} from './store'
import Antd from 'ant-design-vue'

const app = createApp(App)
app.use(router)
app.use(Antd)

setupStore(app)

app.mount('#app')
