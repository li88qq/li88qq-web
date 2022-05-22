import {createRouter, createWebHistory, Router} from 'vue-router'
import {App} from 'vue'

import {Root, Login, NotFound,} from './routes'

const routes = [Root, Login, NotFound,]

export const router: Router = createRouter({
    routes,
    history: createWebHistory()
})

export const setupRouter = (app: App) => {
    app.use(router)
}