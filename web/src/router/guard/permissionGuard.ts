import {Router} from 'vue-router'
import {useUserStore} from '/@/store'

/**
 * 权限拦截
 * @param router
 */
export function createPermissionGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        if (to.path === '/login') {
            return next()
        }
        const userStore = useUserStore();
        if (!userStore.isLogin) {
            return next('/login')
        }
        return next();
    });
}