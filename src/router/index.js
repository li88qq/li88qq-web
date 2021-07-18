import {createRouter, createWebHistory} from 'vue-router'

const base_routes = [
    {path: '/', component: () => import('/@/views/index.vue')},
    {path: '/login', component: () => import('/@/views/login/index.vue')},
    {path: '/home', component: () => import('/@/views/home.vue')},
]

const routes = [...base_routes]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router