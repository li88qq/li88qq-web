import {RouteRecordRaw} from 'vue-router'

export const ROOT: RouteRecordRaw = {
    path: '/',
    component: () => import('/@/views/index.vue')
}

export const LOGIN: RouteRecordRaw = {
    path: '/login',
    component: () => import('/@/views/system/login/index.vue')
}