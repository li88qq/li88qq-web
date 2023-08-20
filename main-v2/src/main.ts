import {createApp} from 'vue'
import App from './App.vue'
import './design/index.css'
import './design/col.css'

import Antd from 'ant-design-vue'
import router from './router'
import {setupStore} from './store'
import {setupDirectives} from './directives'

const app = createApp(App)
app.use(Antd)
app.use(router)
setupStore(app)
setupDirectives(app)
app.mount('#app')