import {App} from 'vue'
import {createPinia} from 'pinia'
import {useUserStore} from './modules/userStore'

export const setupStore = (app: App) => {
    const pinia = createPinia()
    app.use(pinia)
}

export {useUserStore,}