import {Router} from "vue-router";
import {createPermissionGuard} from "/@/router/guard/permissionGuard";

export const setupRouterGuard = (router: Router) => {
    createPermissionGuard(router);
}