import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

const LAYOUT = () => import('@/layout/index.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/', component: LAYOUT, redirect: '/main',
        children: [
            {path: 'main', component: () => import('@/views/main/index.vue'), meta: {title: '主页'}},
            {
                path: 'test', meta: {title: '测试'},
                redirect: '/test/t1',
                children: [
                    {path: 't1', component: () => import('@/views/test/t1/index.vue'), meta: {title: 'Form表单'},},
                    {path: 't2', component: () => import('@/views/test/t2/index.vue'), meta: {title: 'Table表格'},},
                    {path: 't3', component: () => import('@/views/test/t3/index.vue'), meta: {title: 'Modal对话框'},},
                ]
            },
        ]
    },

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router