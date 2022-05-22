import {RouteRecordRaw} from "vue-router";

export const Root: RouteRecordRaw = {
    path: '/', component: () => import('/@/views/home/index.vue'),
}

export const Login: RouteRecordRaw = {
    path: '/login', component: () => import('/@/views/login/index.vue'),
}

export const NotFound: RouteRecordRaw = {
    path: '/:pathMatch(.*)', component: () => import('/@/views/error/404.vue'),
}
