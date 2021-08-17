import {loginStore} from "/@/store/index";


export function createLoginGuard(router) {
    router.beforeEach(async (to, from, next) => {
        if (!(to.path === '/login' || to.name === 'NotFound')) {
            if (!loginStore.state.status) {
                next({name: 'Login'})
                return false;
            }
        }
        next();
    })
}