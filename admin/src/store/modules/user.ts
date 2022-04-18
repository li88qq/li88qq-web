import {defineStore} from 'pinia';

interface UserState {
    username: string,
    token: string,
    head: string,
}

export const useUserStore = defineStore({
    id: 'userStore',
    state: (): UserState => ({
        username: '',
        token: '',
        head: ''
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setInfo(username: string, head: string) {
            this.username = username
            this.head = head;
        }
    }
})