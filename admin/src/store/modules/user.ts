import {defineStore} from 'pinia';

interface UserState {
    username: string,
    token: string,
    head: string,
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        username: '',
        token: '',
        head: ''
    }),
    getters: {
        getUsername(): string {
            return this.username;
        },
        getToken(): string {
            return this.token;
        },
        getHead(): string {
            return this.head;
        },
    },
    actions: {
        setToken(token: string) {
            console.log('token:' + token)
            this.token = token
        },
        setInfo(username: string, head: string) {
            this.username = username
            this.head = head;
        }
    }
})