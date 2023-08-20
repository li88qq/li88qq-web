import type {RouteRecordRaw} from 'vue-router'

export const ROOT :RouteRecordRaw = {
    path:'/',component:()=>import('@/layouts/default/index.vue'),redirect:'/main',
    children:[{
        path:'main',
        component:()=>import('@/views/main/index.vue')
    }]
}

export const PAGE_404:RouteRecordRaw={
    path: '/:pathMatch(.*)*', name: '404', component: () => import('@/views/error/404.vue')
}