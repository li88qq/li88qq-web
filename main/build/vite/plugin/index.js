import vue from '@vitejs/plugin-vue'
import {themePlugin} from './themePlugin'

export const setupPlugin = () => {
    const plugins= []
    plugins.push(vue())
    plugins.push(themePlugin())

    return plugins;
}