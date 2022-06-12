import {createPinia,} from 'pinia'
import useThemeStore from './modules/themeStore'

export const setupStore = (app) => {
    const pinia = createPinia();
    app.use(pinia)
}

export {useThemeStore}