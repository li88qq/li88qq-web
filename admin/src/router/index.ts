import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {basicRoot} from './routes'

const routes: RouteRecordRaw[] = [...basicRoot]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export {routes, router}

