import type {RouteRecordRaw} from 'vue-router'

export const ROOT :RouteRecordRaw = {
    path:'/',component:()=>import('@/layouts/default/index.vue'),name:'ROOT', children:[]
}

export const PAGE_404:RouteRecordRaw={
    path: '/:pathMatch(.*)*', name: '404', component: () => import('@/views/error/404.vue')
}