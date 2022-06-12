import {defineStore} from 'pinia'
import Cookies from "js-cookie";
import {toggleTheme} from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils'

const COOKIE_THEME = 'theme_mode'
const THEME_DEFAULT = 'theme-default'
const THEME_DARK = 'theme-dark'

/**
 * 模式
 */
const useThemeStore = defineStore('themeStore', {
    state: () => ({
        init: false,
        dark: false,
    }),
    actions: {
        //获取初始化模式
        initTheme() {
            if (!this.init) {
                let scopeName = Cookies.get(COOKIE_THEME);
                if (scopeName && scopeName === THEME_DARK) {
                    this.dark = true;
                }
                this.init = true
            }
            return !this.dark;
        },
        //切换模式
        async toggle(check) {
            const scopeName = check ? THEME_DEFAULT : THEME_DARK
            await toggleTheme({scopeName})
            this.dark = check
            Cookies.set(COOKIE_THEME, scopeName, {expires: 7})
        }
    },
})

export default useThemeStore