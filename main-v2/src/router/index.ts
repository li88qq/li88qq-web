import {createRouter,createWebHistory} from 'vue-router'
import {ROOT,PAGE_404} from './routes'

const routes = [ROOT,PAGE_404]

const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router