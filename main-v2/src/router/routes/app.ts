import type {RouteRecordRaw} from 'vue-router'
import {RouterView} from 'vue-router'
import {h} from 'vue'
import {AppstoreOutlined, QrcodeOutlined,HistoryOutlined,StarOutlined} from '@ant-design/icons-vue'

export const App: RouteRecordRaw = {
    path: '/app', redirect: '/app/navigation', component: RouterView, meta: {title: '应用', icon: h(AppstoreOutlined),},
    children: [
        {path: 'navigation', component: () => import('@/views/app/navigation/index.vue'), meta: {title: '导航', icon: h(AppstoreOutlined)}},
        {path: 'timestamp', component: () => import('@/views/app/timestamp/index.vue'), meta: {title: '时间戳', icon: h(HistoryOutlined)}},
        {path: 'json', component: () => import('@/views/app/json/index.vue'), meta: {title: 'json', icon: h(StarOutlined)},},
        {path: 'qrcode', component: () => import('@/views/app/qrcode/index.vue'), meta: {title: 'qrcode', icon: h(QrcodeOutlined)},},
    ]
}