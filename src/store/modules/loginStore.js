import {createStore} from 'vuex';
import {setCookie, removeCookie, getCookie} from '/@/utils/cookieUtil';

const loginStore = createStore({
    state() {
        return {
            status: false
        }
    },
    mutations: {
        login(state) {
            state.status = true;
            setCookie('login', 'true');
        },
        logout(state) {
            state.status = false;
            removeCookie('login');
        },
        check(state) {
            const status = getCookie('login');
            state.status = status !== '';
        }
    }
})

export default loginStore;