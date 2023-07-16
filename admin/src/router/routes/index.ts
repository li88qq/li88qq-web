import {RouteRecordRaw} from 'vue-router'

/**
 * 首页
 */
export const INDEX:RouteRecordRaw = {
    path:'/',component:()=>import('@/views/index.vue'),meta:{title:'首页'}
}

/**
 * 404
 */
export const PAGE404:RouteRecordRaw = {
    path:'/:pathMatch(.*)',component:()=>import('@/views/error/404.vue'),meta:{title:'404'}
}

