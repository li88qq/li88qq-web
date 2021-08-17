import {createRouter, createWebHistory} from 'vue-router';
import {setupGuard} from "./guard";

const modules = import.meta.globEager('./routes/**/*.js');
const routeModuleList = [];
Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

const base_routes = [
    {path: '/', component: () => import('/@/views/index.vue')},
    {path: '/login', name: 'Login', component: () => import('/@/views/login/index.vue')},
    {path: '/home', component: () => import('/@/views/home.vue')},
    {path: '/index', component: () => import('/@/views/index.vue')},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('/@/views/404.vue')},
]

const routes = [...base_routes, ...routeModuleList]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

setupGuard(router);

export default router