import {createRouter, createWebHistory,} from 'vue-router'
import {PAGE_404, ROOT} from './routes/basic'
import appRoutes from './routes/app'

const routes = [ROOT, PAGE_404, ...appRoutes]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export {router, routes,}