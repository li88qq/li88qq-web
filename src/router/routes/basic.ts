import type {RouteRecordRedirect, RouteRecordRaw} from 'vue-router'

export const ROUTE_ROOT: string = 'ROOT'
export const ROUTE_LOGIN: string = 'LOGIN'
export const ROUTE_LAYOUT: string = 'LAYOUT'

/**
 * 根路由
 */
export const ROOT: RouteRecordRedirect = {
    path: '/', redirect: '/index'
}

/**
 * 默认页
 */
export const INDEX: RouteRecordRaw = {
    path: '/index', component: () => import('@/views/index.vue')
}