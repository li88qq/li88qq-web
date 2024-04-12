import {createRouter, createWebHistory} from 'vue-router'
import type {Router} from 'vue-router'
import {ROOT, INDEX} from './routes/basic'

const routes = [ROOT, INDEX]

const router: Router = createRouter({
    routes,
    history: createWebHistory(),
    strict: true,
})

export default router