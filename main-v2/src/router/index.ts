import {createRouter,createWebHistory} from 'vue-router'
import {ROOT,PAGE_404} from './routes'
import {App} from './routes/app'

ROOT.children = [App]
ROOT.redirect = App.path

const routes = [ROOT,PAGE_404]

const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router