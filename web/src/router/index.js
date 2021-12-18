import {createRouter, createWebHistory} from 'vue-router'

import {Index} from './routes'

const routes = [Index]

export const router = createRouter({
    routes,
    history: createWebHistory()
})

export const setupRouter = (app) => {
    app.use(router)
}