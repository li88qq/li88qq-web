import {defineStore} from 'pinia'
import Cookies from "js-cookie";

const TOKEN_KEY = 'token'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        isLogin: false,
        token: '',
    }),
    getters: {},
    actions: {
        init(token?: string) {
            if (!token) {
                token = Cookies.get(TOKEN_KEY) || ''
            }
            if (token) {
                this.isLogin = true
                this.token = token
            }
        },
        login(token: string) {
            this.init(token)
            Cookies.set(TOKEN_KEY, token, {expires: 1})
        }
    }
})