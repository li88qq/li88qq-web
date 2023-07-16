import {createRouter,createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { INDEX, PAGE404 } from './routes'

const routes:RouteRecordRaw[] = [INDEX,PAGE404]

const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router